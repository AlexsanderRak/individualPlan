
// const config = require("./config");
const admin = require("./admin/admin");
const auth_server = require("./auth/auth_server");
const socket = require("./socket/socket");
const auth = require("./endPoints/auth");

const portAuth = process.env.PORT || 3001;
const portAdmin = process.env.PORT || 3002;
const portChats = process.env.PORT || 4000;



auth.creatAdmin();

socket.initSocket(portChats);

admin.initAdmin(portAdmin);

auth_server.initAuth(portAuth);
