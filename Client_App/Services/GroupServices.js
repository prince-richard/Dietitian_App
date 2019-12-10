import {
  baseURL,
  instance,
  handleError,
  authHeader,
  setHeader,
} from './BaseService';
export async function getGroupPatients(groupid) {
  try {
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
export async function updateWeeklyStatement(groupid, message) {
  try {
    await instance.put(
      `${baseURL}/api/group/updateWeeklyStatement/${groupid}/${message}`,
      {},
      authHeader,
    );
    return true;
  } catch (err) {
    handleError(err);
  }
}
export async function getRequests(groupid) {
  try {
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
export async function leaveGroup(id) {
  try {
    await instance.put(`${baseURL}/api/group/leaveGroup/${id}`, {}, authHeader);
    return true;
  } catch (err) {
    handleError(err);
  }
}
export async function getDieticians() {
  try {
    const result = await instance.get(
      `${baseURL}/api/group/getDieticians`,
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
export async function getDietician(groupId) {
  try {
    const result = await instance.get(
      `${baseURL}/api/group/getDietitian/${groupId}`,
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
export async function getDieticianId(groupId) {
  try {
    const result = await instance.get(
      `${baseURL}/api/group/getDietitianId/${groupId}`,
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

export async function requestGroup(id, groupId) {
  try {
    await instance.put(
      `${baseURL}/api/group/requestGroup/${id}/${groupId}`,
      {},
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
