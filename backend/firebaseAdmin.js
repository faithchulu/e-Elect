var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount/evoting-f6e59-firebase-adminsdk-vuqlr-33629f7ff3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;