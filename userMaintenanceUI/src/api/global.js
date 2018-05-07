import { get, post } from './request';

export async function fetchPreference (baseUrl, authenticationToken, { userId }) {
  const url = `${baseUrl}/trueprodigy/user/${userId}/preference/equityfinder`;
  const { body } = await get(authenticationToken, url);
  return body;
}

export async function persistPreference (baseUrl, authenticationToken, { userId, data }) {
  const url = `${baseUrl}/trueprodigy/user/${userId}/preference/equityfinder`;
  const { body } = await post(authenticationToken, url, data);
  return body;
}
