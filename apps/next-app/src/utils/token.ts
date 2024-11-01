const nameStorageToken = "pr-ado--token";

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(nameStorageToken);
  }
  return null; // Retorna null si no está en el entorno del navegador
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(nameStorageToken, token);
  }
};