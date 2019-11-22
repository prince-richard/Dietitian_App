import {
  baseURL,
  instance,
  handleError,
  authHeader,
  setHeader,
} from './BaseService';
export async function getGroupPatients(groupid) {
  try {
    console.log(authHeader);
    console.log('groupId', groupid);
    const result = await instance.get(
      `${baseURL}/api/group/getGroupPatients?groupId=${groupid}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return JSON.parse(result.data);
    }
  } catch (err) {
    handleError(err);
  }
}
export async function getDietHomePage(groupid) {
  try {
    console.log(authHeader);
    console.log('groupId', groupid);
    const result = await instance.get(
      `${baseURL}/api/group/getDietHomePage?groupId=${groupid}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return JSON.parse(result.data);
    }
  } catch (err) {
    handleError(err);
  }
}
export async function updateWeeklyStatement(groupid, weeklyStatement) {
  try {
    console.log(authHeader);
    const result = await instance.put(
      `${baseURL}/api/group/updateWeeklyStatement?groupId=${groupid}&message=${weeklyStatement}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return JSON.parse(result.data);
    }
  } catch (err) {
    handleError(err);
  }
}
export async function getRequests(groupid) {
  try {
    console.log(authHeader);
    console.log('groupId', groupid);
    const result = await instance.get(
      `${baseURL}/api/group/getRequests?groupId=${groupid}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return JSON.parse(result.data);
    }
  } catch (err) {
    handleError(err);
  }
}

export async function updateRequestStatus(statusId, id) {
  try {
    console.log(authHeader);
    await instance.put(
      `${baseURL}/api/group/updateRequestStatus/${id}/${statusId}`,
      {},
      authHeader,
    );
    return true;
  } catch (err) {
    handleError(err);
  }
}
