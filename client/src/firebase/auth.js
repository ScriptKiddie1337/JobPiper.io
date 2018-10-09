import { auth, provider } from './config'

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

// Sign out
export const doSignOut = () =>
  auth.signOut()

// Password Reset
export const doPasswordReset = email =>
  auth.sendPasswordResetEmail(email)

// Password Change
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password)

// Sign in pop up
export const signInPopUp = () => {

  provider.addScope('profile');
  provider.addScope('email');
  provider.addScope('https://www.googleapis.com/auth/calendar')
  auth.signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token.
    localStorage.setItem("GoogleAccessToken", result.credential.accessToken)
    // The signed-in user info.
    localStorage.setItem("GoogleUserInfo", JSON.stringify(result.user))
  });
}

export const refreshToken = () => {

  return (auth.currentUser.getIdToken(true))
}

