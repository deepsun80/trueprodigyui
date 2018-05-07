import { get, post, del, put } from './request';

export async function fetchRoleData (baseUrl, authenticationToken, moduleId) {
  const url = `${baseUrl}/trueprodigy/module/${moduleId}/roles `;
  const { body } = await get(authenticationToken, url);
  return body;
}

export async function addRole (baseUrl, authenticationToken, { moduleID, role }) {
  const url = `${baseUrl}/trueprodigy/module/${moduleID}/roles `;
  const roleObj = {
    role: `${role}`
  };
  const { body } = await post(authenticationToken, url, roleObj);
  return body;
}

export async function editRole (baseUrl, authenticationToken, { moduleID, roleID, role }) {
  const url = `${baseUrl}/trueprodigy/module/${moduleID}/role/${roleID} `;
  const roleObj = {
    role: `${role}`
  };
  const { body } = await put(authenticationToken, url, roleObj);
  return body;
}

export async function deleteRole (baseUrl, authenticationToken, { moduleID, roleID }) {
  const url = `${baseUrl}/trueprodigy/module/${moduleID}/role/${roleID} `;
  const { body } = await del(authenticationToken, url);
  return body;
}

export async function fetchRightsData (baseUrl, authenticationToken, { moduleId, roleID }) {
  const url = `${baseUrl}/trueprodigy/module/${moduleId}/role/${roleID}/userright `;
  const { body } = await get(authenticationToken, url);
  return body;
}

export async function fetchRightsOptionsData (baseUrl, authenticationToken, moduleId) {
  const url = `${baseUrl}/trueprodigy/module/${moduleId}/userrights `;
  const { body } = await get(authenticationToken, url);
  return body;
}

export async function addRights (baseUrl, authenticationToken, { moduleID, roleID, userRightIDList }) {
  const url = `${baseUrl}/trueprodigy/module/${moduleID}/role/${roleID}/userright `;
  const rightsObj = {
    userRightIDList: [ `${userRightIDList}` ]
  };
  const { body } = await post(authenticationToken, url, rightsObj);
  return body;
}

export async function deleteRights (baseUrl, authenticationToken, { moduleID, roleID, userRightIDList }) {
  const url = `${baseUrl}/trueprodigy/module/${moduleID}/role/${roleID}/userright/${userRightIDList} `;
  const { body } = await del(authenticationToken, url);
  return body;
}

