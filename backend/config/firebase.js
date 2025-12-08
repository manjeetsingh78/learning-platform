const admin = require("firebase-admin");

if (process.env.NODE_ENV === "test") {
  console.warn("⚠ Using MOCK Firebase Admin for Jest tests");

  const mockRef = {
    set: jest.fn(),
    get: jest.fn(),
    child: jest.fn().mockReturnThis()
  };

  const mockDb = {
    ref: jest.fn(() => mockRef)
  };

  module.exports = {
    admin: {
      initializeApp: jest.fn(),
      database: () => mockDb
    },
    db: mockDb
  };

} else {
  /* -------- REAL FIREBASE INITIALIZATION (CI or DEV) -------- */

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
    console.warn("⚠ FIREBASE_SERVICE_ACCOUNT missing — running without DB");
    admin.initializeApp();
  }

  const db = admin.database();
  module.exports = { admin, db };
}
