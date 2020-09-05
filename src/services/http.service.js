import axios from 'axios';

import { USER_TOKEN_KEY } from '../constants';

const baseURL = process.env.REACT_APP_API_URL;

const http = axios.create({ baseURL: `${baseURL}/` });

function getAuthHeader() {
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDYzZDY0NmU4NjQxZjk3Y2Y2NTM2M2QwZmFhZjhkZjE1YjI1NWFkYTUwMTJiOWI5NTMwOWE4NjViYjAwZTEzMjkxZjUzMTk5Y2IwM2Q5MGYiLCJpYXQiOjE1OTkyMjkwNTQsIm5iZiI6MTU5OTIyOTA1NCwiZXhwIjoxNjMwNzY1MDU0LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.rGG3RnoeR5GGtW5wyF07SnVpFwZ0yoICOZyx-l1l81W8PINWocmaRRtV1rlR2Ba_Oulx9B17bNiyo4IoPhEu3y75KeqTEqqUDQ0v2EFQ-RSMcpty81Og4KAr8VzXm3fmt3r01s_wsOz8pDTb24pojDSjxg7ULsjyBOet-xMff7CtsvKxVib7MGj5ctDWK4EIcxQ7ojwugeUNi_-gEBa_EOO84PWw-aK8NCiY1UHivaO781OSVfLyrHrwjhrI4baWNhU8S5WGVbViVtum1RObZXWwLGueNYVnWoA8Vb62BtfQK0MONr8rpebCLG_lxbwokoGkW9N60na8tLxxhWI0VTynuGqJv-GMav8X5VcURTUGVKJJVpOI9E56ofvR0c8mlONKFN96b0tU8CBI-RT-tZIDkPb8GipajjEXSd_lma2-GP7YrIw3ZLfSt4naKCtBeutkKIqvj0WjkjfcUUgzIaIEKDKROR425L5hAc-1URKrzo4qD4KhtLJnq_7Pt8y9dZvXp7Ot-yRzz3nSfdWOTrNFh6oPjHsMHTbP2RgilET9v0IpdBBG9Es-141ammC3HXT3khJkOcvI1xmQTw9RG8PXjNxUbt-zOxeQs53mUgf3WuYTJEE7CdsuoYY-OVJPu0Oa1kuAuelhXZ4PFlKm5_E30UL_N901IWgAUkldsBI";

  const accessToken = localStorage.getItem(USER_TOKEN_KEY);
  let authHeader = { 'Content-Type': 'application/json' };
  if (accessToken) {
    authHeader = { Authorization: `Bearer ${accessToken}` };
  }
  return authHeader;
}

function get(url, headers = {}, params = {}) {
  return http.get(url, {
    ...params,
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

export default {
  http,
  get,
  post,
  put,
  remove,
};
