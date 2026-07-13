// Get complete auth object
export const getAuth = () => {
  const auth = localStorage.getItem("user");

  return auth ? JSON.parse(auth) : null;
};

// Save complete auth object
export const setAuth = (authData) => {
  localStorage.setItem("user", JSON.stringify(authData));
};

// Remove auth object
export const clearAuth = () => {
  localStorage.removeItem("user");
};

// Get only access token
export const getAccessToken = () => {
  const auth = getAuth();

  return auth?.accessToken || null;
};

// Update only access token
export const setAccessToken = (accessToken) => {
  const auth = getAuth();

  if (!auth) return;

  auth.accessToken = accessToken;

  setAuth(auth);
};