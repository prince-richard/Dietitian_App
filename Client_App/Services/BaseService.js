import {Alert} from 'react-native';
import {Toast} from 'native-base';

const axios = require('axios');
const baseURL = 'http://dietitian.sna-apps.com';
//const baseURL = 'http://localhost:61657';
var header = null;
const instance = axios.create({
  baseURL: baseURL,
  timeout: 35000,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(null, err => {
  Alert.alert('interceptor', JSON.stringify(err));
  if (err && !err.response) {
    Alert.alert(
      'No connection.',
      'Please make sure you connect to the internet.',
    );
    return;
  }

  if (err && (err.statusCode == 401 || err.statusCode == 403)) {
    NavigationService.navigate('LoginStack');
    return;
  }

  if (err && err.statusCode >= 500) {
    let message = 'Interal error.';
    if (err.message) message = err.message;
    Alert.alert('500', message);
    return;
  }

  return Promise.reject(err);
});

let authHeader = {
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

let authFormFileHeader = {
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};

function setHeader(token) {
  authHeader = {
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  authFormFileHeader = {
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };
}

function handleError(err) {
  //   const msg = JSON.stringify(err.reponse).m;
  //   Alert.alert('Error', JSON.stringify(err));
}

export {
  baseURL,
  instance,
  setHeader,
  handleError,
  authFormFileHeader,
  authHeader,
};
