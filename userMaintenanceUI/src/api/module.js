import { get } from './request';

export async function fetchModuleData (baseUrl, authenticationToken) {
  const url = `${baseUrl}/trueprodigy/modules `;
  const { body } = await get(authenticationToken, url);
  return body;
}
