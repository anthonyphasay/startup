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


/* Authentiction */
app.post('/api/auth/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }
}
)

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


app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    
    if (!response.ok) {
      throw new Error('Failed to fetch from third-party API');
    }
    
    const data = await response.json();
    

    res.json({
      text: data.content,
      author: data.author
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


app.listen(port, () => {
  console.log(`Soups Galore service listening on port ${port}`);
});