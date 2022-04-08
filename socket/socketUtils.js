const findChatRoom = (chats, roomName) => {
  return chats.find((el) => el.roomName === roomName);
};

const findUserInRoom = (chat, userId) => {
  return chat.find((el) => el.id === userId);
};

const isHaveAccess = (users, userId) => {
    return !!(users.findIndex((el) => el == userId) + 1);
};

const findAllUserChats = (chats, userId) => {
    return chats.filter(el => isHaveAccess(el.users, userId));
};

const createChat = (data) => {
  return {
    roomName: data?.roomName,
    users: [...data?.users],
    messages: [data?.messages],
    numberUsers: data?.numberUsers,
    companyId: data?.companyId,
  }
}

module.exports.findChatRoom = findChatRoom;

module.exports.findUserInRoom = findUserInRoom;

module.exports.isHaveAccess = isHaveAccess;

module.exports.findAllUserChats = findAllUserChats;

module.exports.createChat = createChat;


