var firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
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
  firebase.initializeApp(config)
}

const db = firebase.database()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {
  db,
  auth,
  provider,
  config,
  firebase
}
