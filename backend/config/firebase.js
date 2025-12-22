const admin = require("firebase-admin");

// 🔹 If running tests, export a full mock
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
  // ---------------- REAL FIREBASE (CI / Production) ----------------
  let serviceAccount = null;

  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    }
  } catch {
    console.warn("⚠ Failed to parse FIREBASE_SERVICE_ACCOUNT");
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else {
    console.warn("⚠ FIREBASE_SERVICE_ACCOUNT missing — using unauthenticated DB access");
    admin.initializeApp({
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  }

  const db = admin.database();
  module.exports = { admin, db };
}
