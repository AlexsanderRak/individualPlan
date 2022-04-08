const mongoApi = require("../mongoApi");
const mainFunc = require("../utils/mainFunc");
const userApi = require("./user");

const nameBd = "developmentPlan";

module.exports.developmentPlanGet = (request, response) => {
  mongoApi
    .findTo(nameBd, { companyUid: request.query.companyUid })
    .then((res) => {
      response.send(JSON.stringify(res));
    });
};

module.exports.developmentPlanGetOne = (request, response) => {
  mongoApi.findTo(nameBd, { id: request.query.id }).then((res) => {
    response.send(JSON.stringify(res));
  });
};

module.exports.developmentPlanFind = (request, response) => {
  mongoApi
    .findTo(nameBd, {
      companyUid: request.body.companyUid,
      $or: [
        { target: { $regex: request.body.search, $options: "i" } },
        { person: { $regex: request.body.search, $options: "i" } },
        { mentor: { $regex: request.body.search, $options: "i" } },
        { startDate: { $regex: request.body.search, $options: "i" } },
        { endDate: { $regex: request.body.search, $options: "i" } },
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

module.exports.developmentPlanAdd = (request, response) => {
  mongoApi
    .insertOne(nameBd, mainFunc.creatDevelopmentPlan(request.body))
    .then((res) => {
      const id = res[0]._id;
      const developmentPlaUrl = mainFunc.encrypt(String(id));
      const newDevelopmentPlan = { ...res[0] };
      delete newDevelopmentPlan._id;

      mongoApi
        .updateOne(nameBd, {
          id,
          new: {
            ...newDevelopmentPlan,
            developmentPlaUrl: `/developmentPlan/page${developmentPlaUrl}`,
          },
        })
        .then((res) => {
          if (res.n > 0) {
            const dataToSet = {
              person: {id: newDevelopmentPlan.personId, name: newDevelopmentPlan.person},
              mentor: {id: newDevelopmentPlan.mentorId, name: newDevelopmentPlan.mentor}
            }
            userApi.userDevelopmentPlanUpdate(dataToSet, 'person');
            userApi.userDevelopmentPlanUpdate(dataToSet, 'mentor');
            response.send(JSON.stringify(res));
          } else {
            response.statusCode = 400;
            let answer = {
              statusCode: 400,
              message: "element not create developmentPla",
            };
            response.send(JSON.stringify(answer));
          }
        });
    });
};

module.exports.developmentPlanUpdate = (request, response) => {
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

module.exports.developmentPlanDelete = (request, response) => {
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
