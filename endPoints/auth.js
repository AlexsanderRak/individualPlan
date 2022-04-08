const mongoApi = require("../mongoApi");
const uuid = require("uuid");
const mainFunc = require("../utils/mainFunc");

module.exports.login = (request, response) => {
  mongoApi.findOne("users", request.body).then((res) => {
    response.send(JSON.stringify(res));
  });
};

// role
// 0: admin
// 1: user
// 12: manager
// 13: client

module.exports.regestration = (request, response) => {
  mongoApi
    .findOne("company", {
      companyName: request.body.companyName,
      uNPFirms: request.body.uNPFirms,
    })
    .then((res) => {
      if (!res) {
        mongoApi
          .findOne("users", {
            email: request.body.email,
            pass: request.body.pass,
          })
          .then((res) => {
            if (!res) {
              mongoApi
                .insertOne("users", mainFunc.createUser(request.body, "12", null))
                .then((res) => {
                  const pereson = res[0];
                  console.log(pereson);
                  mongoApi
                    .insertOne("company", mainFunc.createCompany(request, pereson))
                    .then((res) => {
                      const newPerson = { ...pereson, companyUid: String(res[0]._id) }
                      mongoApi
                        .updateOne("users", {
                          id: pereson._id,
                          new: newPerson,
                        })
                        .then((res) => {
                          // console.log("users111", res);
                          response.send(JSON.stringify(newPerson));
                        });
                    });
                });
            } else {
              const pereson = res;
              console.log("not added, users already exists");
              mongoApi
                .insertOne("company", mainFunc.createCompany(request, pereson))
                .then((res) => {
                  response.send(JSON.stringify(pereson));
                });
            }
          });
      } else {
        response.statusCode = 400;
        let answer = {
          statusCode: 400,
          message: "not added, company already exists",
        };
        response.send(JSON.stringify(answer));
      }
    });
};


module.exports.activeProfile = (request, response) => {
  mongoApi
  .findOne("users", {
    email: request.body.email,
    pass: request.body.pass,
  })
  .then((res) => {
    if (res) {
      console.log("users1", res);
      const person = res;
      mongoApi
      .updateOne("users", {
        id: res._id,
        new: { ...res, dateActiveProfile: new Date().toISOString(), pass: request.body.newPassword, activeProfileLink: '' },
      })
      .then((res) => {
        console.log("users111", person);
        response.send(JSON.stringify(person));
      });

    } else {
      response.statusCode = 400;
      let answer = {
        statusCode: 400,
        message: "user absent",
      };
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.creatAdmin = () => {
  mongoApi.findOne("users", { email: "admin", pass: "admin" }).then((res) => {
    if (!res) {
      mongoApi
        .insertOne(
          "users",
          mainFunc.createUser(
            {
              email: "admin",
              pass: "admin",
              lastName: "admin",
              firstName: "admin",
              patronymic: "admin",
            },
            "0",
            null
          )
        )
        .then((res) => {
          console.log("creatAdmin", JSON.stringify(res));
        });
    } else {
      console.log("Err creatAdmin");
    }
  });
};

// role
// 0: admin
// 1: user
// 12: company
// 13: client

module.exports.creatClient = (request, response) => {
  const newUuid = uuid.v4();
  console.log(
    "------------------------uuid--------------",
    newUuid,
    "name:uuid",
    `${request.body.name}:${newUuid}`
  );

  mongoApi
    .insertOne("users", {
      login: "-",
      pass: "-",
      firstName: `${request.body.name}:${newUuid}`,
      middleName: "-",
      role: "13",
    })
    .then((res) => {
      console.log("res", res);
      if (res) {
        response.send(JSON.stringify(res));
      } else {
        console.log("Err creatClient");
      }
    });
};
