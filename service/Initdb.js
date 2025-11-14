const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const initialRecipes = [
  {
    id: '1',
    name: 'Chicken Noodle Soup',
    continent: 'North America',
    image: '/images/chickennoddle2.jpg',
    ingredients: ['2 large chicken breasts', 'Carrots', 'Peas', 'Celery', 'Onion', 'Garlic 2-3 cloves', 'Low sodium chicken broth', 'Egg noodles', 'Salt', 'Pepper', 'Garlic Salt', 'Rosemary', 'Oregano', 'Chicken bouillon cube', 'Optional: Cilantro'],
    instructions: 'In a medium size pot, add water half way, add 1-2 chicken bouillon cube. Place 2 chicken breast in water. Bring water to boil. Add chicken breast and cover with lid. Cook until you can pull apart the chicken breast easily, it will take around 25-30 minutes. Then remove chicken out of stove, into a cutting board and use fork to shred chicken. In a large pot, add olive oil till hot. Cut up celery, carrots, and onion. Add onion to the pot and sauteed until onion change slightly in color, add salt, pepper, garlic salt to the onion. Then add garlic, sauteed for 2-5 minutes. Then add carrots and celery at the same time. Sauteed the veggies for 5-7 minutes. Then add the shredded chicken. Add the chicken broth (32-64 Oz of chicken broth or water/chicken bouillon mixture of the same amount). Bring pot to boil. Add the egg noodles. Cover, and let it cook until noodles are tender. Add peas and cilantro 5 minutes until end of cooking process. Season to taste. Remove soup from heat and let it stand for 20 minutes. Serve and eat!',
    description: 'A classic American comfort soup perfect for cold days',
    prepTime: '60 minutes',
    favorites: 0
  },
  {
    id: '2',
    name: 'Vietnamese Pho',
    continent: 'Asia',
    image: '/images/phoRecipe.jpg',
    ingredients: ['Oxtail', 'Onion', 'Ginger', 'Salt', 'Pho Bo cube', 'Beef Pho concentrate', 'Rice noodles', 'Bean sprouts', 'Basil', 'Cilantro', 'Green onion'],
    instructions: 'Add water to your pot. Put stove on high. Add 1 onion and 1 Ginger. Then add 1-2 cubes pho bo if you\'re also using the concentrate. Add salt, 2 or 3 tablespoon depending on how big your pot is. Bring the pot to boil. While preparing the big pot, in a smaller pot add water and bring it to a boil. Add the oxtail and boil it for 10-15 minutes. Take oxtails out of pot, and rinse with cold water to get rid of impurities. Add the oxtail to the stock pot. Add pho concentrate. Boil everything on medium-low heat for a couple of hours before serving. Once broth is completed, you can prepare the bowl based on your liking. In a small pot, add water and bring to a boil. Add dry noodles for 1-2 minutes, depending on if you like softer noodles. Next, cook meats in broth. Add to bowl, and add soy beans, basil, green onions, cilantro depending on your liking. Enjoy!',
    description: 'Traditional Vietnamese soup with aromatic broth from Ho Chi Minh City',
    prepTime: '3 hours',
    favorites: 0
  },
  {
    id: '3',
    name: 'Italian Wedding Soup',
    continent: 'Europe',
    image: '/images/italian noodle soup.jpg',
    ingredients: ['Lean Ground Beef', 'Ground Pork', 'Spicy Italian Ground Beef', 'Fresh bread crumbs', 'Parsley', 'Oregano', 'Parmesan', 'Egg', 'Onion', 'Garlic', 'Pasta', 'Salt and black pepper', 'Olive Oil', 'Low sodium chicken broth', 'Spinach', 'Carrots', 'Celery'],
    instructions: 'First make mini meatball mixture by adding beef and pork in a mixing bowl. Add crumbs, eggs, parsley, oregano, parmesan, 1 tsp salt, 1/4 tsp pepper. Then break and toss mixture with hands. Create meatballs based on a size you want. In large non-stick skillet, heat 1 Tablespoon of olive oil over medium-high heat. Add the meatballs and cook until they turn brown, turning occasionally about 4 minutes total. Then transfer the meatballs to a plate with paper towel. Leave the oil in skillet. Now, we can heat 1 tablespoon of olive oil in a large pot over medium-high heat. Add carrots, onions, and celery and saute until they have soften, this should take around 6-8 minutes. Add garlic and saute 1 minute longer. Now pour the chicken broth in the sauteed veggies pot, season soup with salt and pepper to taste then bring it to boil. Stir the pasta and meatballs, reduce to medium low heat. Cover and cook while stirring occasionally until pasta is tender and meatballs are cooked all the way through. Add spinach the last minute of cooking along with some parmesan cheese. Now serve your meal and enjoy getting married!',
    description: 'Classic Italian soup with meatballs, pasta, and greens',
    prepTime: '45 minutes',
    favorites: 0
  }
];

async function initializeDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('startup');
    const recipeCollection = db.collection('recipes');

    const existingRecipes = await recipeCollection.countDocuments();

    if (existingRecipes === 0) {
      console.log('Inserting initial recipes...');
      await recipeCollection.insertMany(initialRecipes);
      console.log(`Successfully inserted ${initialRecipes.length} recipes`);
    } else {
      console.log(`Database already has ${existingRecipes} recipes. Skipping initialization.`);
    }

    // Create indexes for better performance
    await recipeCollection.createIndex({ id: 1 }, { unique: true });
    await recipeCollection.createIndex({ continent: 1 });
    await recipeCollection.createIndex({ favorites: -1 });

    const userCollection = db.collection('users');
    await userCollection.createIndex({ email: 1 }, { unique: true });
    await userCollection.createIndex({ token: 1 });

    console.log('Database indexes created successfully');
    console.log('Database initialization complete!');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

initializeDatabase();