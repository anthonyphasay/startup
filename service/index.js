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


app.listen(port, () => {
  console.log(`Soups Galore service listening on port ${port}`);
});