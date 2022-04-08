const CryptoJS = require("crypto-js");
const uuid = require("uuid");

const createUser = (request, role, companyUid) => {
  const pass = request.pass || uuid.v4();
  let activeProfileLink = null;

  if (!request.pass) {
    // Encrypt
    const cipherEmail = encrypt(request.email);

    const cipherPass = encrypt(pass);

    // Decrypt
    // console.log('cipherEmail', cipherEmail);
    // console.log('cipherPass', cipherPass);
    // console.log('email', CryptoJS.AES.decrypt(cipherEmail, 'rak').toString(CryptoJS.enc.Utf8));
    // console.log('pass', CryptoJS.AES.decrypt(cipherPass, 'rak').toString(CryptoJS.enc.Utf8));

    activeProfileLink = `/activateProfile${cipherEmail}-${cipherPass}`;
    // console.log('activeProfileLink', activeProfileLink);
  }

  return {
    role: role,
    email: request.email,
    pass: pass,
    lastName: request.lastName,
    firstName: request.firstName,
    patronymic: request.patronymic,
    companyUid: companyUid,
    dateBirth: "",
    phoneNumber: "",
    photoUrl: "",
    position: "",
    articles: [],
    activePlan: null,
    activePlanUrl: "",
    plans: [],
    mentor: "",
    students: [],
    manager: "",
    skillMatrixUrl: "",
    skillMatrix: [],
    activeProfileLink: activeProfileLink,
    dateRegistration: new Date().toISOString(),
    dateActiveProfile: request.pass ? new Date().toISOString() : null,
    dateLastActive: new Date().toISOString(),
  };
};

const createCompany = (request, pereson) => {
  return {
    companyName: request.body.companyName,
    uNPFirms: request.body.uNPFirms,
    numberEmployees: request.body.numberEmployees,
    creator: pereson._id,
    dateCreat: new Date().toISOString(),
    users: [pereson._id],
  };
};

const creatArticle = (data) => {

    return {
      name: data.name, 
      description: data.description, 
      creator: data.creator, 
      creatorId: data.creatorId,
      creatingDate: new Date().toISOString(),
      editingDate: '',
      companyUid: data.companyUid,
      editing: '',
      editingId: '',
      articleUrl: '',
      guard: [],
    }
};

const creatDevelopmentPlan = (data) => {

  return {
    target: data.target,
    percent: data.percent,
    person: data.person,
    personId: data.personId,
    mentor: data.mentor,
    mentorId: data.mentorId,
    startDate: data.startDate,
    endDate: data.endDate,
    description: data.description,
    taskList: data.taskList.map((el) => creatTask(el)),

    creator: data.creator, 
    creatorId: data.creatorId,
    creatingDate: new Date().toISOString(),
    editingDate: '',
    companyUid: data.companyUid,
    editing: '',
    editingId: '',
    developmentPlaUrl: '',
    guard: [],
  }
};

const creatTask = (data) => {
  const articleUrl =  data.type === 'select' ? encrypt(String(data.id)) : null;
  return {
    id: data.id,
    title: data.title,
    type: data.type,
    creatingDate: new Date().toISOString(),
    isComplite: false,
    isAttended: false,
    timeInArticle: null,
    percentComplete: 0,
    articleUrl: articleUrl ? `/knowledgeBase/page${articleUrl}` : null,

  }

}

const encrypt = (text) => CryptoJS.AES.encrypt(text, "rak").toString().replace(/\//g,'Por21Ld');

module.exports.createUser = createUser;

module.exports.createCompany = createCompany;

module.exports.creatArticle = creatArticle;

module.exports.creatDevelopmentPlan = creatDevelopmentPlan;

module.exports.encrypt = encrypt;