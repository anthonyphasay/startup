const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;


app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//need to replace with DB 
const users = {};
const authTokens = {};


let recipes = [
  {
    id: '1',
    name: 'Chicken Noodle Soup',
    continent: 'North America',
    image: 'placeholder.png',
    ingredients: ['Chicken', 'Noodles', 'Carrots', 'Celery', 'Onion', 'Chicken broth'],
    instructions: 'Boil chicken, add vegetables, simmer for 30 minutes...',
    description: 'A classic comfort soup perfect for cold days',
    prepTime: '45 minutes',
    favorites: 0
  },
  {
    id: '2',
    name: 'Miso Soup',
    continent: 'Asia',
    image: 'placeholder.png',
    ingredients: ['Miso paste', 'Tofu', 'Seaweed', 'Green onions', 'Dashi stock'],
    instructions: 'Heat dashi, dissolve miso paste, add tofu and seaweed...',
    description: 'Traditional Japanese soup with umami flavors',
    prepTime: '15 minutes',
    favorites: 0
  },
  {
    id: '3',
    name: 'French Onion Soup',
    continent: 'Europe',
    image: 'placeholder.png',
    ingredients: ['Onions', 'Beef broth', 'Gruyere cheese', 'Bread', 'Butter', 'Thyme'],
    instructions: 'Caramelize onions, add broth, top with cheese and bread...',
    description: 'Rich and savory soup with melted cheese',
    prepTime: '60 minutes',
    favorites: 0
  }
];


/* Authentication */

// new user
app.post('/api/auth/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  if (users[email]) {
    return res.status(409).json({ msg: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email,
    username: username || email.split('@')[0],
    passwordHash,
    favorites: [],
    createdAt: new Date().toISOString()
  };

  users[email] = user;

  const token = uuid();
  authTokens[token] = email;

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.json({
    email: user.email,
    username: user.username
  });
});

// Existing user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users[email];

  if (!user) {
    return res.status(401).json({ msg: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ msg: 'Invalid email or password' });
  }

  const token = uuid();
  authTokens[token] = email;

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.json({
    email: user.email,
    username: user.username
  });
});

app.delete('/api/auth/logout', (req, res) => {
  const token = req.cookies.token;

  if (token) {
    delete authTokens[token];
  }

  res.clearCookie('token');
  res.status(204).end();
});

app.get('/api/auth/user', (req, res) => {
  const token = req.cookies.token;

  if (!token || !authTokens[token]) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }

  const email = authTokens[token];
  const user = users[email];

  res.json({
    email: user.email,
    username: user.username,
    favorites: user.favorites
  });
});


/* Recipes */

app.get('/api/recipes', (req, res) => {
  const { continent } = req.query;
  
  let filteredRecipes = recipes;
  
  if (continent) {
    filteredRecipes = recipes.filter(r => r.continent === continent);
  }
  
  res.json(filteredRecipes);
});

app.get('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ msg: 'Recipe not found' });
  }

  res.json(recipe);
});

app.get('/api/recipes/continent/:continent', (req, res) => {
  const { continent } = req.params;
  const continentRecipes = recipes.filter(
    r => r.continent.toLowerCase() === continent.toLowerCase()
  );

  res.json(continentRecipes);
});


/* Middleware */

function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token || !authTokens[token]) {
    return res.status(401).json({ msg: 'Authentication required' });
  }

  req.userEmail = authTokens[token];
  next();
}


/* Favorites */

app.get('/api/favorites', requireAuth, (req, res) => {
  const user = users[req.userEmail];
  const favoriteRecipes = recipes.filter(r => user.favorites.includes(r.id));
  
  res.json(favoriteRecipes);
});


app.post('/api/favorites/:recipeId', requireAuth, (req, res) => {
  const { recipeId } = req.params;
  const user = users[req.userEmail];

  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) {
    return res.status(404).json({ msg: 'Recipe not found' });
  }

  if (user.favorites.includes(recipeId)) {
    return res.status(400).json({ msg: 'Recipe already favorited' });
  }

  user.favorites.push(recipeId);
  recipe.favorites++;

  res.json({ msg: 'Recipe added to favorites', favorites: user.favorites });
});


app.delete('/api/favorites/:recipeId', requireAuth, (req, res) => {
  const { recipeId } = req.params;
  const user = users[req.userEmail];

  const index = user.favorites.indexOf(recipeId);
  
  if (index === -1) {
    return res.status(400).json({ msg: 'Recipe not in favorites' });
  }

  user.favorites.splice(index, 1);
  
  const recipe = recipes.find(r => r.id === recipeId);
  if (recipe && recipe.favorites > 0) {
    recipe.favorites--;
  }

  res.json({ msg: 'Recipe removed from favorites', favorites: user.favorites });
});

app.get('/api/recipes/popular', (req, res) => {
  const popularRecipes = [...recipes]
    .sort((a, b) => b.favorites - a.favorites)
    .slice(0, 5)
    .map(r => ({
      id: r.id,
      name: r.name,
      favorites: r.favorites
    }));

  res.json(popularRecipes);
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    
    if (!response.ok) {
      throw new Error('Failed to fetch from third-party API');
    }
    
    const data = await response.json();
    
    res.json({
      text: data[0].q,
      author: data[0].a  
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    const fallbackQuotes = [
      { text: "Good soup warms the soul", author: "Traditional Saying" },
      { text: "Soup is cuisine's kindest course", author: "Virginia Woolf" }
    ];
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json(randomQuote);
  }
});

app.listen(port, () => {
  console.log(`Soups Galore service listening on port ${port}`);
});