import {
  baseURL,
  instance,
  handleError,
  authHeader,
  setHeader,
} from './BaseService';
export async function sendMessage(message, receiverId, groupId) {
  try {
    const messageDTO = convertToServer(message[0], receiverId, groupId);
    const result = await instance.post(
      `${baseURL}/api/message`,
      messageDTO,
      authHeader,
    );
    return true;
  } catch (err) {
    handleError(err);
  }
}
export async function getAllMessages(patientId) {
  try {
    const result = await instance.get(
      `${baseURL}/api/message/GetMessages?userId=${patientId}&take=100`,
      authHeader,
    );
    if (result) {
      const data = JSON.parse(result.data);
      const messages = data.map(message => {
        return convertFromServer(message);
      });
      return messages;
    }
  } catch (err) {
    handleError(err);
  }
}
export function convertFromHub(message) {
  return {
    _id: message.id,
    receiverId: message.receiverId,
    groupId: message.groupId,
    text: message.contents,
    createdAt: message.timestamp,
    user: {
      _id: message.senderId,
      name: message.sender
        ? `${message.sender.firstName} ${message.sender.lastName}`
        : '',
    },
  };
}
export function convertFromServer(message) {
  return {
    _id: message.Id,
    receiverId: message.ReceiverId,
    groupId: message.GroupId,
    text: message.Contents,
    createdAt: message.Timestamp,
    user: {
      _id: message.SenderId,
      name: message.Sender
        ? `${message.Sender.FirstName} ${message.Sender.LastName}`
        : '',
    },
  };
}
export function convertToServer(message, receiverId, groupId) {
  return {
    Id: 0,
    SenderId: message.user._id,
    RecieverId: receiverId,
    GroupId: groupId,
    Timestamp: message.createdAt,
    Contents: message.text,
  };
}
