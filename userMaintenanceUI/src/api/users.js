import { get, post, put, del } from './request';

export async function fetchUsersData (baseUrl, authenticationToken) {
  const url = `${baseUrl}/trueprodigy/users?includeInactive=false `;
  const { body } = await get(authenticationToken, url);
  return body;
}

export async function deleteUser (baseUrl, authenticationToken, { id }) {
  const url = `${baseUrl}/trueprodigy/user/${id}/inactivate `;
  const { body } = await put(authenticationToken, url);
  return body;
}

export async function addUser (baseUrl, authenticationToken, { email, fullName }) {
  const url = `${baseUrl}/trueprodigy/users `;
  const userObj = {
    email: `${email}`,
    fullName: `${fullName}`,
    officeName: 'True Prodigy'
  };
  const { body } = await post(authenticationToken, url, userObj);
  return body;
}

export async function addUserModule (baseUrl, authenticationToken, { userID, moduleID }) {
  const url = `${baseUrl}/trueprodigy/user/${userID}/module/${moduleID} `;
  const { body } = await post(authenticationToken, url);
  return body;
}

export async function addRoleUser (baseUrl, authenticationToken, { userID, moduleID, roleIDList }) {
  const url = `${baseUrl}/trueprodigy/user/${userID}/module/${moduleID}/roles `;
  const userObj = {
    roleIDList: `${roleIDList}`
  };
  const { body } = await post(authenticationToken, url, userObj);
  return body;
}

export async function deleteUserModule (baseUrl, authenticationToken, { userID, moduleID }) {
  const url = `${baseUrl}/trueprodigy/user/${userID}/module/${moduleID} `;
  await del(authenticationToken, url);
  const body = 'loaded';
  return body;
}

export async function deleteUserRole (baseUrl, authenticationToken, { userID, moduleID, roleID }) {
  const url = `${baseUrl}/trueprodigy/user/${userID}/module/${moduleID}/role/${roleID} `;
  const { body } = await del(authenticationToken, url);
  return body;
}

export async function fetchUserModules (baseUrl, authenticationToken, { userID }) {
  const url = `${baseUrl}/trueprodigy/user/${userID}/modules `;
  const { body } = await get(authenticationToken, url);
  return body;
}

export async function editUserName (baseUrl, authenticationToken, { userID, fullName }) {
  const url = `${baseUrl}/trueprodigy/user/${userID} `;
  const userObj = {
    fullName: `${fullName}`
  };
  const { body } = await put(authenticationToken, url, userObj);
  return body;
}

export async function fetchUserRoles (baseUrl, authenticationToken, { userID }) {
  const url = `${baseUrl}/trueprodigy/user/${userID}/roles `;
  const { body } = await get(authenticationToken, url);
  return body;
}
