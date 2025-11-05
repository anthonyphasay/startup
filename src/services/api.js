
// authentication

export async function register(email, password, username) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Registration failed');
  }

  return await response.json();
}

export async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Login failed');
  }

  return await response.json();
}

export async function logout() {
  const response = await fetch('/api/auth/logout', {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}

export async function getCurrentUser() {
  const response = await fetch('/api/auth/user');

  if (!response.ok) {
    return null; // Not authenticated
  }

  return await response.json();
}

// recipes

export async function getAllRecipes(continent = null) {
  const url = continent 
    ? `/api/recipes?continent=${encodeURIComponent(continent)}`
    : '/api/recipes';
    
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return await response.json();
}

export async function getRecipeById(id) {
  const response = await fetch(`/api/recipes/${id}`);

  if (!response.ok) {
    throw new Error('Recipe not found');
  }

  return await response.json();
}

export async function getRecipesByContinent(continent) {
  const response = await fetch(`/api/recipes/continent/${continent}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return await response.json();
}

export async function getPopularRecipes() {
  const response = await fetch('/api/recipes/popular');

  if (!response.ok) {
    throw new Error('Failed to fetch popular recipes');
  }

  return await response.json();
}

// favorites

export async function getFavorites() {
  const response = await fetch('/api/favorites');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Failed to fetch favorites');
  }

  return await response.json();
}

export async function addFavorite(recipeId) {
  const response = await fetch(`/api/favorites/${recipeId}`, {
    method: 'POST'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Failed to add favorite');
  }

  return await response.json();
}

export async function removeFavorite(recipeId) {
  const response = await fetch(`/api/favorites/${recipeId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Failed to remove favorite');
  }

  return await response.json();
}

//quotes

export async function getInspirationalQuote() {
  const response = await fetch('/api/quote');

  if (!response.ok) {
    throw new Error('Failed to fetch quote');
  }

  return await response.json();
}