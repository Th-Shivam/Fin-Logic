const admin = require('firebase-admin');

// PLACEHOLDER: Replace with your actual service account key
// Download from: Firebase Console → Project Settings → Service Accounts → Generate New Private Key

/*
To enable Firebase:
1. Download serviceAccountKey.json from Firebase Console
2. Place it in the project root
3. Uncomment the code below
*/


let serviceAccount;
let isConfigured = false;
let db, auth;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // Only try to require if the file exists to avoid crashing
    const fs = require('fs');
    if (fs.existsSync('./serviceAccountKey.json')) {
        serviceAccount = require('./serviceAccountKey.json');
    }
  }
} catch (e) {
  console.log("⚠️ Error loading service account:", e.message);
}

if (serviceAccount) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log("✅ Firebase Admin initialized successfully");
      db = admin.firestore();
      auth = admin.auth();
      isConfigured = true;
    } catch (error) {
      console.error("❌ Firebase Admin initialization failed:", error);
    }
} else {
    console.log("⚠️ Firebase not configured (missing serviceAccountKey.json). Skipping.");
}

module.exports = { admin, db, auth, isConfigured };
