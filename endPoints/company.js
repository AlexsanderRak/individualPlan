const mongoApi = require("../mongoApi");


const createCompany = (request, pereson)=> {
    return {
      companyName: request.body.companyName,
      uNPFirms: request.body.uNPFirms,
      numberEmployees: request.body.numberEmployees,
      creator: pereson._id,
      dateCreat: new Date().toISOString(),
      users: [pereson._id],
    }
  }
  
  module.exports.createCompany = createCompany;


  module.exports.companyAdd = (request, response) => {
    mongoApi
    .findOne("company", {
      companyName: request.body.companyName,
      uNPFirms: request.body.uNPFirms,
    })
    .then((res) => {
      if (!res) {
        mongoApi
        .insertOne("company", createCompany(request, pereson))
        .then((res) => {
          response.send(JSON.stringify(pereson));
        });
      } else {

      }
    });
  };
  
  module.exports.companyUpdate = (request, response) => {
    mongoApi.updateOne("company", request.body).then((res) => {
      if (res.n > 0) {
        response.send(JSON.stringify(res));
      } else {
        response.statusCode = 400;
        let answer = {statusCode: 400, message: 'element not update company'};
        response.send(JSON.stringify(answer));
      }
  
    });
  };