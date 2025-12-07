// const admin = require('firebase-admin');

// // Replace with your Firebase service account key
// const serviceAccount = require('C:/Users/Abhishek Yadav/Downloads/learning-platform-d166e-firebase-adminsdk-fbsvc-efedddb682.json');

const admin = require("firebase-admin");

// Load Firebase Service Account JSON
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learning-platform-d166e-default-rtdb.firebaseio.com/"
});

console.log(" Firebase initialized successfully");

const db = admin.database();

module.exports = { admin, db };
