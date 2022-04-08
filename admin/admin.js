var express = require("express");
var app = express();
const bodyParser = require("body-parser");

const user = require("../endPoints/user");
const decision = require("../endPoints/decision");
const auth = require("../endPoints/auth");

const jsonParser = bodyParser.json();

module.exports.initAdmin = (port) => { 
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header(
          "Access-Control-Allow-Methods",
          "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
        );
        next();
      });
      
      app.post("/login", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "--------------------------------------------------login------------------------------------------------------"
        );
        console.log("/login", request.body);
        auth.login(request, response);
      });
      
      app.post("/creatClient", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/creatClient---------------------------------------------------------"
        );
        console.log("/creatClient", request.body);
        auth.creatClient(request, response);
      });
      
      // ---------------------------- User -------------------------------------------------
      
      app.get("/user", jsonParser, function (request, response) {
        console.log(
          "-----------------------------------------------/user---------------------------------------------------------"
        );
        console.log("/user/get");
        user.userGet(request, response);
      });
      
      app.post("/user", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/user---------------------------------------------------------"
        );
        console.log("/user/add", request.body);
        user.userAdd(request, response);
      });
      
      app.put("/user", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/user---------------------------------------------------------"
        );
        console.log("/user/update", request.body);
        user.userUpdate(request, response);
      });
      
      app.delete("/user", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/user---------------------------------------------------------"
        );
        console.log("/user/delete", request.body);
        user.userDelete(request, response);
      });
      
      // ---------------------------- User -------------------------------------------------
      
      // ---------------------------- Decision -------------------------------------------------
      
      app.get("/decision", jsonParser, function (request, response) {
        console.log(
          "-----------------------------------------------/decision---------------------------------------------------------"
        );
        console.log("/decision/get");
        decision.decisionGet(request, response);
      });
      
      app.post("/decision/search", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/decision---------------------------------------------------------"
        );
        console.log("/decision/search", request.body);
        decision.decisionFind(request, response);
      });
      
      app.post("/decision", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/decision---------------------------------------------------------"
        );
        console.log("/decision/add", request.body);
        decision.decisionAdd(request, response);
      });
      
      app.put("/decision", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/decision---------------------------------------------------------"
        );
        console.log("/decision/update", request.body);
        decision.decisionUpdate(request, response);
      });
      
      app.delete("/decision", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/decision---------------------------------------------------------"
        );
        console.log("/decision/delete", request.body);
        decision.decisionDelete(request, response);
      });
      
      
      
      app.listen(port, () => {
        console.log("Server endpoints listening at port %d", port);
        console.log(
          "----------------------------------------------Server----------------------------------------------------------"
        );
      });
}