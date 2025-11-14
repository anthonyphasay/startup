const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const path = require('path');
const DB = require('./database.js');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;


app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


// let recipes = [
//   {
//     id: '1',
//     name: 'Chicken Noodle Soup',
//     continent: 'North America',
//     image: '/images/chickennoddle2.jpg',
//     ingredients: ['2 large chicken breasts', 'Carrots', 'Peas', 'Celery', 'Onion', 'Garlic 2-3 cloves', 'Low sodium chicken broth', 'Egg noodles', 'Salt', 'Pepper', 'Garlic Salt', 'Rosemary', 'Oregano', 'Chicken bouillon cube', 'Optional: Cilantro'],
//     instructions: 'In a medium size pot, add water half way, add 1-2 chicken bouillon cube. Place 2 chicken breast in water. Bring water to boil. Add chicken breast and cover with lid. Cook until you can pull apart the chicken breast easily, it will take around 25-30 minutes. Then remove chicken out of stove, into a cutting board and use fork to shred chicken. In a large pot, add olive oil till hot. Cut up celery, carrots, and onion. Add onion to the pot and sauteed until onion change slightly in color, add salt, pepper, garlic salt to the onion. Then add garlic, sauteed for 2-5 minutes. Then add carrots and celery at the same time. Sauteed the veggies for 5-7 minutes. Then add the shredded chicken. Add the chicken broth (32-64 Oz of chicken broth or water/chicken bouillon mixture of the same amount). Bring pot to boil. Add the egg noodles. Cover, and let it cook until noodles are tender. Add peas and cilantro 5 minutes until end of cooking process. Season to taste. Remove soup from heat and let it stand for 20 minutes. Serve and eat!',
//     description: 'A classic American comfort soup perfect for cold days',
//     prepTime: '60 minutes',
//     favorites: 0
//   },
//   {
//     id: '2',
//     name: 'Vietnamese Pho',
//     continent: 'Asia',
//     image: '/images/phoRecipe.jpg',
//     ingredients: ['Oxtail', 'Onion', 'Ginger', 'Salt', 'Pho Bo cube', 'Beef Pho concentrate', 'Rice noodles', 'Bean sprouts', 'Basil', 'Cilantro', 'Green onion'],
//     instructions: 'Add water to your pot. Put stove on high. Add 1 onion and 1 Ginger. Then add 1-2 cubes pho bo if you\'re also using the concentrate. Add salt, 2 or 3 tablespoon depending on how big your pot is. Bring the pot to boil. While preparing the big pot, in a smaller pot add water and bring it to a boil. Add the oxtail and boil it for 10-15 minutes. Take oxtails out of pot, and rinse with cold water to get rid of impurities. Add the oxtail to the stock pot. Add pho concentrate. Boil everything on medium-low heat for a couple of hours before serving. Once broth is completed, you can prepare the bowl based on your liking. In a small pot, add water and bring to a boil. Add dry noodles for 1-2 minutes, depending on if you like softer noodles. Next, cook meats in broth. Add to bowl, and add soy beans, basil, green onions, cilantro depending on your liking. Enjoy!',
//     description: 'Traditional Vietnamese soup with aromatic broth from Ho Chi Minh City',
//     prepTime: '3 hours',
//     favorites: 0
//   },
//   {
//     id: '3',
//     name: 'Italian Wedding Soup',
//     continent: 'Europe',
//     image: '/images/italian noodle soup.jpg',
//     ingredients: ['Lean Ground Beef', 'Ground Pork', 'Spicy Italian Ground Beef', 'Fresh bread crumbs', 'Parsley', 'Oregano', 'Parmesan', 'Egg', 'Onion', 'Garlic', 'Pasta', 'Salt and black pepper', 'Olive Oil', 'Low sodium chicken broth', 'Spinach', 'Carrots', 'Celery'],
//     instructions: 'First make mini meatball mixture by adding beef and pork in a mixing bowl. Add crumbs, eggs, parsley, oregano, parmesan, 1 tsp salt, 1/4 tsp pepper. Then break and toss mixture with hands. Create meatballs based on a size you want. In large non-stick skillet, heat 1 Tablespoon of olive oil over medium-high heat. Add the meatballs and cook until they turn brown, turning occasionally about 4 minutes total. Then transfer the meatballs to a plate with paper towel. Leave the oil in skillet. Now, we can heat 1 tablespoon of olive oil in a large pot over medium-high heat. Add carrots, onions, and celery and saute until they have soften, this should take around 6-8 minutes. Add garlic and saute 1 minute longer. Now pour the chicken broth in the sauteed veggies pot, season soup with salt and pepper to taste then bring it to boil. Stir the pasta and meatballs, reduce to medium low heat. Cover and cook while stirring occasionally until pasta is tender and meatballs are cooked all the way through. Add spinach the last minute of cooking along with some parmesan cheese. Now serve your meal and enjoy getting married!',
//     description: 'Classic Italian soup with meatballs, pasta, and greens',
//     prepTime: '45 minutes',
//     favorites: 0
//   }
// ];


/* Authentication */

// new user
app.post('/api/auth/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  const existingUser = await DB.getUser(email);
  if (existingUser) {
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

  await DB.createUser(user);

  const token = uuid();
  await DB.addAuthToken(email, token);

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

  const user = await DB.getUser(email);

  if (!user) {
    return res.status(401).json({ msg: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ msg: 'Invalid email or password' });
  }

  const token = uuid();
  await DB.addAuthToken(email, token);

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

app.delete('/api/auth/logout', async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await DB.removeAuthToken(token);
  }

  res.clearCookie('token');
  res.status(204).end();
});

app.get('/api/auth/user', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }

  const user = await DB.getUserByToken(token);

  if (!user) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }

  res.json({
    email: user.email,
    username: user.username,
    favorites: user.favorites
  });
});


/* Recipes */

app.get('/api/recipes', async (req, res) => {
  const { continent } = req.query;
  
  const recipes = await DB.getAllRecipes(continent || null);
  
  res.json(recipes);
});

app.get('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await DB.getRecipeById(id);

  if (!recipe) {
    return res.status(404).json({ msg: 'Recipe not found' });
  }

  res.json(recipe);
});

app.get('/api/recipes/continent/:continent', async (req, res) => {
  const { continent } = req.params;
  const continentRecipes = await DB.getAllRecipes(continent);

  res.json(continentRecipes);
});




/* Middleware */

async function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'Authentication required' });
  }

  const user = await DB.getUserByToken(token);

  if (!user) {
    return res.status(401).json({ msg: 'Authentication required' });
  }

  req.userEmail = user.email;
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
    // Try using built-in fetch (Node 18+) or fall back immediately
    if (typeof fetch === 'undefined') {
      throw new Error('Fetch not available, using fallback');
    }
    
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
    // Fallback quotes when API is unavailable
    const fallbackQuotes = [
      { text: "Good soup warms the soul", author: "Traditional Saying" },
      { text: "Soup is cuisine's kindest course", author: "Virginia Woolf" },
      { text: "Soup is a lot like a family. Each ingredient enhances the others", author: "Unknown" },
      { text: "Only the pure of heart can make a good soup", author: "Ludwig van Beethoven" }
    ];
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json(randomQuote);
  }
});

// Return the application's default page if the path is unknown
// This must be AFTER all API routes so API calls don't get caught
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Soups Galore service listening on port ${port}`);
});