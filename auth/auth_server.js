var express = require("express");
var app = express();
const bodyParser = require("body-parser");

const user = require("../endPoints/user");
const decision = require("../endPoints/decision");
const developmentPlan = require("../endPoints/developmentPlan");
const auth = require("../endPoints/auth");

const jsonParser = bodyParser.json();

module.exports.initAuth = (port) => { 
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header(
          "Access-Control-Allow-Methods",
          "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
        );
        next();
      });
      
      app.post("/auth", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "--------------------------------------------------auth------------------------------------------------------"
        );
        console.log("/auth", request.body);
        auth.login(request, response);
      });
      
      app.post("/auth/regestration", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/auth/regestration---------------------------------------------------------"
        );
        console.log("/auth/regestration", request.body);
        auth.regestration(request, response);
      });

      app.post("/auth/activeProfile", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/auth/activeProfile---------------------------------------------------------"
        );
        console.log("/auth/activeProfile", request.body);
        auth.activeProfile(request, response);
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

      app.get("/user/skillMatrix", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/user---------------------------------------------------------"
        );
        console.log("/user/skillMatrix/get", request.query);
        user.userGetSkillMatrix(request, response);
      });

      app.put("/user/skillMatrix", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/user---------------------------------------------------------"
        );
        console.log("/user/skillMatrix/put", request.body);
        user.userUpdateSkillMatrix(request, response);
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

      app.get("/decision/one", jsonParser, function (request, response) {
        console.log(
          "-----------------------------------------------/decision---------------------------------------------------------"
        );
        console.log("/decision/one/get");
        decision.decisionGetOne(request, response);
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
      
      // ---------------------------- DevelopmentPlan -------------------------------------------------
      
      app.get("/developmentPlan", jsonParser, function (request, response) {
        console.log(
          "-----------------------------------------------/developmentPlan---------------------------------------------------------"
        );
        console.log("/developmentPlan/get");
        developmentPlan.developmentPlanGet(request, response);
      });

      app.get("/developmentPlan/one", jsonParser, function (request, response) {
        console.log(
          "-----------------------------------------------/developmentPlan---------------------------------------------------------"
        );
        console.log("/developmentPlan/one/get");
        developmentPlan.developmentPlanGetOne(request, response);
      });

      app.post("/developmentPlan/search", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/developmentPlan---------------------------------------------------------"
        );
        console.log("/decision/search", request.body);
        developmentPlan.developmentPlanFind(request, response);
      });
      
      app.post("/developmentPlan", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/developmentPlan---------------------------------------------------------"
        );
        console.log("/developmentPlan/add", request.body);
        developmentPlan.developmentPlanAdd(request, response);
      });
      
      app.put("/developmentPlan", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/developmentPlan---------------------------------------------------------"
        );
        console.log("/developmentPlan/update", request.body);
        developmentPlan.developmentPlanUpdate(request, response);
      });
      
      app.delete("/developmentPlan", jsonParser, function (request, response) {
        if (!request.body) return response.sendStatus(400);
        console.log(
          "-----------------------------------------------/developmentPlan---------------------------------------------------------"
        );
        console.log("/developmentPlan/delete", request.body);
        developmentPlan.developmentPlanDelete(request, response);
      });
      
      
      app.listen(port, () => {
        console.log("Server endpoints listening at port %d", port);
        console.log(
          "----------------------------------------------Server----------------------------------------------------------"
        );
      });
}