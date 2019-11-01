import {
  baseURL,
  instance,
  handleError,
  authHeader,
  setHeader,
} from './BaseService';
import {Alert} from 'react-native';
export let user;
export async function login(username, password) {
  try {
    console.log(`${baseURL}/api/account/login`);
    const result = await instance.post(
      `${baseURL}/api/account/login`,
      {
        email: username,
        password: password,
      },
      authHeader,
    );
    if (result) {
      setHeader(result.token);
      return result.data;
    }
  } catch (err) {
    handleError(err);
  }
}
