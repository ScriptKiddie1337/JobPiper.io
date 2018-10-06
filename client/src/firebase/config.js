var firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  clientId: process.env.GOOGLE_CLIENT_ID,
  scopes: [
    "email",
    "profile",
    "https://www.googleapis.com/auth/calendar"
  ],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}


if (!firebase.apps.length) {
  console.log(config)
  firebase.initializeApp(config)
}

const db = firebase.database()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {
  db,
  auth,
  provider,
  config
}
