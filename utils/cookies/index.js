// Cookie helper functions for secure cookies

// Create exported function for reading cookie
export function getCookie(name) {
  // Create variable for storing cookie value
  let cookieValue = null;
  // Check if window object is available
  if (typeof window !== 'undefined') {
    // If window object is available, get cookie value
    [, cookieValue] = (document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`)) || '')
      .split('=');
  }
  // Return cookie value
  return cookieValue;
}

// Create exported function for setting cookie
export function setCookie(name, value, seconds = null) {
  // Create variable for storing cookie expiration date
  let expires = '';
  // Check if seconds is set
  if (seconds) {
    // If seconds is set, create expiration date
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  // Set cookie
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Strict; Secure`;
}

// Create exported function for deleting cookie
export function deleteCookie(name) {
  // Delete cookie
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Strict; Secure`;
}
