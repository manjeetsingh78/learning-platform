const admin = require("firebase-admin");

// Parse the JSON string stored in GitHub Secrets
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learning-platform-13df1-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = { admin, db };
