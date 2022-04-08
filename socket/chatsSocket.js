const mongoApi = require("../mongoApi");

module.exports.chatsGet = async (companyId) => {
  return mongoApi.findBy("chats", {companyId}).then((res) => {
    return res;
  });
};

module.exports.getChat = async (data) => {
  return mongoApi.findOne("chats", {roomName: data}).then((res) => {
    return res;
  });
};

module.exports.chatAdd = async (data) => {
  return mongoApi.findOne("chats", {roomName: data.roomName}).then((res) => {
    if (!res) {
      mongoApi
        .insertOne("chats", data)
        .then((res) => {
          return res;
        });
    } else {
      return null
    }
  });
};

module.exports.chatUpdate = async (data) => {
  return mongoApi.updateOne("chats", data).then((res) => {
    if (res.n > 0) {
      return res;
    } else {
      return null;
    }

  });
};

module.exports.chatDelete = async (data) => {
  return mongoApi.deleteOne("chats", data).then((res) => {
    if (res.n > 0) {
      return res;
    } else {
      return null;
    }
    
  });
};
