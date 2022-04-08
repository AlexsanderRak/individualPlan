const mongoApi = require("../mongoApi");
const mainFunc = require("../utils/mainFunc");
const userApi = require("./user");

const nameBd = 'knowledgeBase';

module.exports.decisionGet = (request, response) => {
  mongoApi.findTo(nameBd, {companyUid: request.query.companyUid}).then((res) => {
    response.send(JSON.stringify(res));
  });
};

module.exports.decisionGetOne = (request, response) => {
  mongoApi.findTo(nameBd, {id: request.query.id}).then((res) => {
    response.send(JSON.stringify(res));
  });
};

module.exports.decisionFind = (request, response) => {
  mongoApi
    .findTo(nameBd, {
      companyUid: request.body.companyUid,
      $or: [
        { name: { $regex: request.body.search, $options: "i" } },
        { description: { $regex: request.body.search, $options: "i" } },
        { creator: { $regex: request.body.search, $options: "i" } },
        { creatingDate: { $regex: request.body.search, $options: "i" } },
      ],
    })
    .then((res) => {
      if (!res._id) {
        response.send(JSON.stringify(res));
      } else {
        response.statusCode = 400;
        let answer = { statusCode: 400, message: "not find, decision" };
        response.send(JSON.stringify(answer));
      }
    });
};

module.exports.decisionAdd = (request, response) => {
  mongoApi.findOne(nameBd, { name: request.body.name }).then((res) => {
    if (!res) {
      mongoApi
        .insertOne(nameBd, mainFunc.creatArticle(request.body))
        .then((res) => {
          
          const id = res[0]._id
          const articleUrl = mainFunc.encrypt(String(id));
          const newArticle = {...res[0]};
          delete newArticle._id;

          mongoApi.updateOne(nameBd, { id, new: {...newArticle, articleUrl: `/knowledgeBase/page${articleUrl}`}})
          .then((res) => {

            if (res.n > 0) {
              userApi.userDecisionUpdate(newArticle.creatorId);
              response.send(JSON.stringify(res));
            } else {
              response.statusCode = 400;
              let answer = {
                statusCode: 400,
                message: "element not create decision",
              };
              response.send(JSON.stringify(answer));
            }

          });

        });
    } else {
      response.statusCode = 400;
      let answer = {
        statusCode: 400,
        message: "not added, decision already exists",
      };
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.decisionUpdate = (request, response) => {
  mongoApi.updateOne(nameBd, request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = { statusCode: 400, message: "element not update decision" };
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.decisionDelete = (request, response) => {
  mongoApi.deleteOne(nameBd, request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = { statusCode: 400, message: "not delete decision" };
      response.send(JSON.stringify(answer));
    }
  });
};
