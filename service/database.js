const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const recipeCollection = db.collection('recipes');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(user) {
  const result = await userCollection.insertOne(user);
  return result;
}

async function updateUser(email, updates) {
  const result = await userCollection.updateOne(
    { email: email },
    { $set: updates }
  );
  return result;
}

async function addUserFavorite(email, recipeId) {
  const result = await userCollection.updateOne(
    { email: email },
    { $addToSet: { favorites: recipeId } }
  );
  return result;
}

async function removeUserFavorite(email, recipeId) {
  const result = await userCollection.updateOne(
    { email: email },
    { $pull: { favorites: recipeId } }
  );
  return result;
}


// recipes
async function getAllRecipes(continent = null) {
  const query = continent ? { continent: continent } : {};
  return recipeCollection.find(query).toArray();
}

async function getRecipeById(id) {
  return recipeCollection.findOne({ id: id });
}

async function createRecipe(recipe) {
  const result = await recipeCollection.insertOne(recipe);
  return result;
}

async function updateRecipe(id, updates) {
  const result = await recipeCollection.updateOne(
    { id: id },
    { $set: updates }
  );
  return result;
}

async function incrementRecipeFavorites(id) {
  const result = await recipeCollection.updateOne(
    { id: id },
    { $inc: { favorites: 1 } }
  );
  return result;
}

async function decrementRecipeFavorites(id) {
  const result = await recipeCollection.updateOne(
    { id: id },
    { $inc: { favorites: -1 } }
  );
  return result;
}

async function getPopularRecipes(limit = 5) {
  return recipeCollection
    .find()
    .sort({ favorites: -1 })
    .limit(limit)
    .toArray();
}

// authentication tokens to store users
async function addAuthToken(email, token) {
  const result = await userCollection.updateOne(
    { email: email },
    { $set: { token: token, lastLogin: new Date().toISOString() } }
  );
  return result;
}

async function removeAuthToken(token) {
  const result = await userCollection.updateOne(
    { token: token },
    { $unset: { token: "" } }
  );
  return result;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUser,
  addUserFavorite,
  removeUserFavorite,
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  incrementRecipeFavorites,
  decrementRecipeFavorites,
  getPopularRecipes,
  addAuthToken,
  removeAuthToken
};