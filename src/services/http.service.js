import axios from 'axios';
import socketio from 'socket.io-client';

import { USER_TOKEN_KEY } from '../constants';

const baseURL = process.env.REACT_APP_API_URL;

const http = axios.create({ baseURL: `${baseURL}/` });

function getAuthHeader() {
  const accessToken = localStorage.getItem(USER_TOKEN_KEY);
  let authHeader = { 'Content-Type': 'application/json' };
  if (accessToken) {
    authHeader = { Authorization: `Bearer ${accessToken}` };
  }
  return authHeader;
}

function get(url, headers = {}, params = {}) {
  return http.get(url, {
    params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function post(url, data, headers = {}, params = {}) {
  return http.post(url, data, {
    ...params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function put(url, data, headers = {}) {
  return http.put(url, data, { headers: { ...getAuthHeader(), ...headers } });
}

function remove(url, data, headers = {}) {
  return http.delete(url, {
    headers: { ...getAuthHeader(), ...headers },
    data,
  });
}

function notificationSocket() {
  return {
    host: `${window.location.origin}:4003`,
    auth: {
      headers: { ...getAuthHeader(), Accept: 'application/json' },
    },
    broadcaster: 'socket.io',
    client: socketio,
  };
}

export default {
  http,
  get,
  post,
  put,
  remove,
  notificationSocket,
};
