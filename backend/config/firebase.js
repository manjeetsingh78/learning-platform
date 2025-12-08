const admin = require("firebase-admin");

let serviceAccount = null;

// Safely parse Firebase credentials (GitHub Actions only)
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
} catch (err) {
  console.warn("⚠ Failed to parse FIREBASE_SERVICE_ACCOUNT:", err.message);
}

// Initialize Firebase properly in CI, fallback mock in testing
if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://learning-platform-13df1-default-rtdb.firebaseio.com/"
  });
} else {
  // Local/Jest environment → no credentials needed
  console.warn("⚠ FIREBASE_SERVICE_ACCOUNT missing — initializing Firebase with default app for tests");
  admin.initializeApp();
}

const db = admin.database();

module.exports = { admin, db };
