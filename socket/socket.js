var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const uuid = require("uuid");
const socketApi = require("./socketApi");



module.exports.initSocket = (port) => {
  server.listen(port, () => {
    console.log(
      "----------------------------------------------Server----------------------------------------------------------"
    );
    console.log("Server socket listening at port %d", port);
  });

  app.use(express.static(path.join(__dirname, "public")));

  var numUsers = 0;
  

  io.on("connection", (socket) => {

    console.log("connected", socket.handshake.query.userName);
    var addedUser = false;

    socket.on("getAllUserChats", (data) => {
      socketApi.getAllUserChats(socket, data.companyId);
    });

    socket.on("connectToRoom", (roomName) => {
      socketApi.connectToRoom(io, socket, roomName);
    });

    socket.on("createMessage", (data) => {
      const {roomName, newMessage} = data;
      socketApi.createMessage(io, socket, roomName, newMessage);
    });

    socket.on("clientSendingFirstMessage", (data) => {
      socketApi.clientSendingFirstMessage(io, socket, data);
    });

    socket.on("deleteMessage", (data) => {
      const {roomName, id} = data;
      socketApi.deleteMessage(io, socket, roomName, id);
    });

    socket.on("disconnectToRoom", (roomName) => {
      socket.leave('room');
      socketApi.connectToRoom(io, socket, roomName);
    });
    

// old
    socket.on("updateTask", (data) => {
      todoList = data;
      io.sockets.emit("tasksList", todoList);
    });

    socket.on("createTask", (data) => {
      console.log("data", data);
      todoList.push(data);
      io.sockets.emit("tasksList", todoList);
    });

    socket.on("deleteTask", function (id) {
      todoList = todoList.filter((el) => el.id !== id);

      io.sockets.emit("tasksList", todoList);
    });

    socket.on("beingEdited", (id) => {
      todoList.find(
        (el, index) =>
          el.id === id &&
          (todoList[index].isBeingEdited = {
            status: !todoList[index].isBeingEdited.status,
            user: socket.username,
          })
      );

      io.sockets.emit("tasksList", todoList);
    });

    socket.on("stopBeingEdited", (id) => {
      todoList.find(
        (el, index) =>
          el.id === id &&
          (todoList[index].isBeingEdited = {
            status: !todoList[index].isBeingEdited.status,
            user: "",
          })
      );

      io.sockets.emit("tasksList", todoList);
    });

    socket.on("disconnect", () => {
      console.log("disconnect", numUsers);

      if (addedUser) {
        --numUsers;

        io.sockets.emit("userLeft", {
          username: socket.username,
          numUsers: numUsers,
        });
      }
    });
  });
};
