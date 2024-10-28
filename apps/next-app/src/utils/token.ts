const nameStorageToken = "pr-ado--token";

export const getToken = () => localStorage.getItem(nameStorageToken);
export const setToken = (token: string) =>
  localStorage.setItem(nameStorageToken, token);
