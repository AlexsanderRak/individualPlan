const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
var ObjectId = require("mongodb").ObjectId;

const bd_name = "individualPlanDB";
const collectionNames = [
  "users",
  "company",
  "chats",
  "knowledgeBase",
  "developmentPlan",
];

const mongoConnect = (method, collectionName, data) => {
  // console.log(collectionName);

  if (collectionNames.findIndex((item) => item === collectionName) + 1) {
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

    return new Promise((resolve, reject) => {
      mongoClient.connect((err, client) => {
        const db = client.db(bd_name);
        const collection = db.collection(collectionName);

        switch (method) {
          case "find":
            collection.find().toArray((err, result) => {
              if (err) {
                console.log("mongo find err", err);
                reject(err);
              }
              // console.log("mongo find result", result);
              client.close();

              resolve(result);
            });
            break;

          case "findTo":
            if (data.id) {
              var o_id = new ObjectId(data.id);
              collection.find({ _id: o_id }).toArray((err, result) => {
                if (err) {
                  console.log("mongo find err", err);
                  reject(err);
                }
                //  console.log("mongo find result", result);
                client.close();

                resolve(result);
              });
            } else {
              collection.find(data).toArray((err, result) => {
                if (err) {
                  console.log("mongo find err", err);
                  reject(err);
                }
                //  console.log("mongo find result", result);
                client.close();

                resolve(result);
              });
            }

            break;

          case "findBy":
            if (data) {
              collection.find(data).toArray((err, result) => {
                if (err) {
                  console.log("mongo find err", err);
                  reject(err);
                }
                //  console.log("mongo find result", result);
                client.close();
                resolve(result);
              });
            } else {
              collection.find(data).toArray((err, result) => {
                if (err) {
                  console.log("mongo find err", err);
                  reject(err);
                }
                //  console.log("mongo find result", result);
                client.close();

                resolve(result);
              });
            }

            break;

          case "findOne":
            collection.findOne(data, (err, result) => {
              if (err) {
                console.log("mongo findOne err", err);
                reject(err);
              }
              // console.log("mongo findOne result", result);
              client.close();

              resolve(result);
            });
            break;

          case "insertOne":
            collection.insertOne(data, (err, result) => {
              if (err) {
                console.log("mongo insertOne err", err);
                reject(err);
              }
              // console.log("mongo insertOne result", result.ops);
              client.close();

              resolve(result.ops);
            });
            break;

          case "updateOne":
            var o_id = new ObjectId(data.id);
            collection.updateOne(
              { _id: o_id },
              { $set: data.new },
              (err, result) => {
                if (err) {
                  console.log("mongo updateOne err", err);
                  reject(err);
                }
                // console.log("mongo updateOne result", result.result);
                client.close();

                resolve(result.result);
              }
            );
            break;

          case "deleteOne":
            var o_id = new ObjectId(data.id);
            collection.deleteOne({ _id: o_id }, (err, result) => {
              if (err) {
                console.log("mongo deleteOne err", err);
                reject(err);
              }
              // console.log("mongo deleteOne result", result.result);
              client.close();

              resolve(result.result);
            });
            break;
        }
      });
    });
  } else {
    console.log("oops");
  }
};

module.exports.find = (collectionName) => {
  return mongoConnect("find", collectionName);
};

module.exports.findTo = (collectionName, data) => {
  return mongoConnect("findTo", collectionName, data);
};

module.exports.findBy = (collectionName, data) => {
  return mongoConnect("findBy", collectionName, data);
};

module.exports.findOne = (collectionName, data) => {
  return mongoConnect("findOne", collectionName, data);
};

module.exports.insertOne = (collectionName, data) => {
  return mongoConnect("insertOne", collectionName, data);
};

module.exports.updateOne = (collectionName, data) => {
  return mongoConnect("updateOne", collectionName, data);
};

module.exports.deleteOne = (collectionName, data) => {
  return mongoConnect("deleteOne", collectionName, data);
};
