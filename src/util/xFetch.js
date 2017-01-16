import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
import { parseParam } from './index'

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  console.log(res);
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {
  const { success, message } = res.jsonResult;
  if (!success) {
    return Promise.reject(message);
  }
  return res;
}

function xFetch(url, options) {
  const opts = { ...options, credentials: 'include' };
  opts.headers = {
    ...opts.headers,
    authorization: cookie.get('authorization') || ''
  };

  if(__CONTEXT__){
    url = __CONTEXT__ + url;
  }

  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

export function Post(url, params = {}) {
  const query = parseParam(params);
  return xFetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: query
   });
}

export function Get(url, params) {
  const query = parseParam(params);
  return xFetch(`${url}?${query}`, { method: 'GET' });
}

export function PostJsonBody(url, params = '') {
  //const query = parseParam(params);
  return xFetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: params
   });
}

export default xFetch;
