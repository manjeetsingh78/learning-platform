const admin = require("firebase-admin");

// 🔹 If running tests, export a full mock (no returns!)
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

  // IMPORTANT: do NOT continue to the real initialization
} else {
  // ---------------- REAL FIREBASE (CI / Production) ----------------
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
