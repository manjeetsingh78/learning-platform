const admin = require("firebase-admin");

// If running tests, return a mock Firebase app
if (process.env.NODE_ENV === "test") {
  console.warn("⚠ Using MOCK Firebase Admin for Jest tests");

  const mockDb = {
    ref: () => ({
      set: jest.fn(),
      get: jest.fn(),
      child: jest.fn(),
    }),
  };

  module.exports = {
    admin: {
      initializeApp: jest.fn(),
      database: () => mockDb,
    },
    db: mockDb,
  };

  return;
}

/* --------- REAL FIREBASE INITIALIZATION FOR CI -------- */

let serviceAccount = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
} catch (err) {
  console.warn("⚠ Failed to parse FIREBASE_SERVICE_ACCOUNT:", err.message);
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://learning-platform-13df1-default-rtdb.firebaseio.com/"
  });
} else {
  console.warn("⚠ FIREBASE_SERVICE_ACCOUNT missing — initializing without real DB (local dev)");
  admin.initializeApp();
}

const db = admin.database();

module.exports = { admin, db };
