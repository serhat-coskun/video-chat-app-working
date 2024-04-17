import * as Keychain from 'react-native-keychain';

export const storeCredentials = async (username:string, password:string) => {
  try {
    await Keychain.setGenericPassword(username, password);
    console.log('Credentials successfully stored');
  } catch (error) {
    console.error('Could not store credentials', error);
  }
};

export const getCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Credentials successfully loaded');
      return credentials;
    } else {
      console.log('No credentials stored');
      return null;
    }
  } catch (error) {
    console.error('Could not load credentials', error);
    return null;
  }
};

export const clearCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Credentials successfully cleared');
  } catch (error) {
    console.error('Could not clear credentials', error);
  }
};


/**
 * Stores the authentication token securely.
 * @param {string} token - The authentication token to store.
 */
export const storeToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('authToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Failed to store token', error);
  }
};

/**
 * Retrieves the stored authentication token, if any.
 * @returns {Promise<string | null>} - The retrieved token or null if none is stored.
 */
export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password; // The token is stored as the password
    }
    return null;
  } catch (error) {
    console.error('Failed to retrieve token', error);
    return null;
  }
};

/**
 * Clears the stored authentication token.
 */
export const clearToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token cleared successfully');
  } catch (error) {
    console.error('Failed to clear token', error);
  }
};

