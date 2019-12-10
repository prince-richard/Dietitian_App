import {
  baseURL,
  instance,
  handleError,
  authHeader,
  setHeader,
} from './BaseService';
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
      console.log(result);
      setHeader(result.data.token);
      user = result.data;
      return result.data;
    }
  } catch (err) {
    handleError(err);
  }
}
export async function createPatient(
  FirstName,
  LastName,
  PhoneNumber,
  Email,
  Password,
  GroupId,
) {
  try {
    const patient = {
      FirstName: FirstName,
      LastName: LastName,
      PhoneNumber: PhoneNumber,
      Email: Email,
      Password: Password,
      GroupId: GroupId,
      rolestring: ['User'],
    };
    console.log(patient);
    const result = await instance.post(
      `${baseURL}/api/user/createPatient`,
      JSON.stringify(patient),
      authHeader,
    );
    return result;
  } catch (err) {
    handleError(err);
  }
}
