export const AUTH_KEY = "marvels.auth.v1";
export const AUTH_USERNAME = "marvels";

export function getCurrentTimePassword(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}${minutes}`;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}

export function loginUser(username: string, password: string): boolean {
  const normalizedUsername = username.trim().toLowerCase();
  const validUsername = normalizedUsername === AUTH_USERNAME;
  const validPassword = password === getCurrentTimePassword();

  if (validUsername && validPassword) {
    window.localStorage.setItem(AUTH_KEY, "true");
    return true;
  }

  return false;
}

export function logoutUser(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
}
