const mongoApi = require("../mongoApi");
const mainFunc = require("../utils/mainFunc");

module.exports.userGet = (request, response) => {
  // console.log('request', request.query.companyUid);
  mongoApi
    .findTo("users", { companyUid: request.query.companyUid })
    .then((res) => {
      let newRes = res.map((el) => {
        delete el.pass;
        return el;
      });
      response.send(JSON.stringify(newRes));
    });
};

// role
// 0: admin
// 1: user
// 12: manager
// 13: client

module.exports.userAdd = (request, response) => {
  mongoApi.findOne("users", { email: request.body.email }).then((res) => {
    if (!res) {
      mongoApi
        .insertOne(
          "users",
          mainFunc.createUser(
            request.body,
            request.body.role,
            request.body.companyUid
          )
        )
        .then((res) => {
          // company update
          response.send(JSON.stringify(res));
        });
    } else {
      response.statusCode = 400;
      let answer = {
        statusCode: 400,
        message: "not added, user already exists",
      };
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.userUpdate = (request, response) => {
  mongoApi.updateOne("users", request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = { statusCode: 400, message: "element not update user" };
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.userGetSkillMatrix = (request, response) => {
  mongoApi.findTo("users", { id: request.query.id }).then((res) => {
    console.log("request", request.query.id);
    if (res) {
      // console.log('res[0].skillMatrix', res[0].skillMatrix);
      response.send(JSON.stringify(res[0].skillMatrix));
    } else {
      response.statusCode = 400;
      let answer = { statusCode: 400, message: "not finde user" };
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.userUpdateSkillMatrix = (request, response) => {
  const newPerson = { ...request.body };

  const cipherId = mainFunc.encrypt(newPerson.id);
  newPerson.new.skillMatrixUrl = `/personal-area/skill-matrix${cipherId}`;

  delete newPerson.new._id;
  mongoApi.updateOne("users", newPerson).then((res) => {
    // console.log('mongoApi.updateOne', res);
    if (res.n > 0) {
      mongoApi
        .findOne("users", {
          email: newPerson.new.email,
          pass: newPerson.new.pass,
        })
        .then((res) => {
          // console.log('mongoApi.findOne', res);
          response.send(JSON.stringify(res));
        });
      // response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = { statusCode: 400, message: "element not update user" };
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.userDevelopmentPlanUpdate = (data, typeUser) => {
  switch (typeUser) {
    // --------------------------------------person -----------------------------------------
    case "person":
      mongoApi.findTo("users", { id: data.person.id }).then((res) => {
        if (res) {
          const newPerson = res[0];
          mongoApi
            .findTo("developmentPlan", { personId: data.person.id })
            .then((resDevPlan) => {
              const sortingRes = resDevPlan.sort(
                (a, b) => a.startDate - b.startDate
              );
              newPerson.activePlan = sortingRes[0]._id;
              newPerson.activePlanUrl = sortingRes[0].developmentPlaUrl;
              newPerson.plans = [...sortingRes];
              newPerson.mentor = sortingRes[0].mentor;

              delete newPerson._id;
              mongoApi
                .updateOne("users", { id: data.person.id, new: newPerson })
                .then((res) => {
                  if (res.n > 0) {
                    console.log("update user", res);
                  } else {
                    console.log("element not update user", res);
                  }
                });
            });
        } else {
          console.log("not finde user", res);
        }
      });
      break;
    // --------------------------------------mentor -----------------------------------------
    case "mentor":
      mongoApi.findTo("users", { id: data.mentor.id }).then((res) => {
        if (res) {
          const newPerson = res[0];

          const students = [...newPerson.students];
          const isHasStudent = students.filter(
            (el) => el.id === data.person.id
          ).length;
          if (!isHasStudent) {
            newPerson.students = students.filter(
              (el) => el.id !== data.person.id
            );
            newPerson.students.push(data.person);
            delete newPerson._id;
            mongoApi
              .updateOne("users", { id: data.mentor.id, new: newPerson })
              .then((res) => {
                if (res.n > 0) {
                  console.log("update user", res);
                } else {
                  console.log("element not update user", res);
                }
              });
          }
        } else {
          console.log("not finde user", res);
        }
      });
      break;
  }
};

module.exports.userDecisionUpdate = (id) => {
  mongoApi.findTo("users", { id: id }).then((res) => {
    if (res) {
      const newPerson = res[0];
      mongoApi
        .findTo("knowledgeBase", { creatorId: id })
        .then((resDecision) => {
          newPerson.articles = resDecision.map(el => {return {id: el._id, name: el.name}});
          delete newPerson._id;

          mongoApi
            .updateOne("users", { id: id, new: newPerson })
            .then((res) => {
              if (res.n > 0) {
                console.log("update user", res);
              } else {
                console.log("element not update user", res);
              }
            });
        });
    } else {
      console.log("not finde user", res);
    }
  });
};

module.exports.userDelete = (request, response) => {
  mongoApi.deleteOne("users", request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = { statusCode: 400, message: "not delete user" };
      response.send(JSON.stringify(answer));
    }
  });
};
