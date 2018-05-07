import { post } from './request';
import base64 from 'base-64';

export async function login (baseUrl, { username, password }) {
  try {
    // TODO: localize! Server should return proper error message to display to the user.
    const { body } = await post(`Basic ${base64.encode(`${username}:${password}`)}`, `${baseUrl}/trueprodigy/auth/token`);
    return body;
  } catch (error) {
    /* eslint-disable no-throw-literal */
    if (error.body.httpStatus === 401) {
      throw 'incorrect';
    }
    throw error;
  }
}

export async function checkToken (baseUrl, { token }) {
  try {
    const { body } = await post(token, `${baseUrl}/trueprodigy/auth/token/verify`, undefined, { contentType: 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' });
    return body;
  } catch (error) {
    if (error.body.httpStatus === 401) {
      throw 'incorrect';
    }
    throw error;
  }
}
