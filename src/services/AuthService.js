import api from "./api";
import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3vxaYWtoQkaXcAyIyITyfD1vdzypnOjY",
  authDomain: "ecogniapp.firebaseapp.com",
  projectId: "ecogniapp",
  storageBucket: "ecogniapp.appspot.com",
  messagingSenderId: "330638727056",
  appId: "1:330638727056:web:ef8d6b3e879871cf104515",
  measurementId: "G-HGLGS9KTER",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const getToken = () => auth.currentUser.getIdToken(true);

const auth = firebase.auth();

const handleSignInError = (error) => {
  throw error;
};

const AuthService = {
  signIn: (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return getToken().then((token) => {
          api.defaults.headers.common["Authorization"] = token;
          return user;
        });
      })
      .catch((error) => handleSignInError(error, email, password)),
  userLoggedIn: (success, error) =>
    auth.onAuthStateChanged((user) => {
      if (user) {
        getToken().then((token) => {
          api.defaults.headers.common["Authorization"] = token;
          if (success) success(user);
        });
      } else {
        error();
      }
    }),
  signOut: () => auth.signOut(),
  signUp: (correo, password) =>
    auth.createUserWithEmailAndPassword(correo, password),
  recoverPassword: (email) => auth.sendPasswordResetEmail(email),
  getToken: () => auth.currentUser.getIdToken(true),
  updateEmail: (email) => auth.currentUser.updateEmail(email),
  getRecaptchaVerifier: (button_id, callback) =>
    new firebase.auth.RecaptchaVerifier(button_id, {
      size: "invisible",
      callback,
    }),
  signInWithPhoneNumber: (phone, verifier) =>
    auth.signInWithPhoneNumber(phone, verifier),
  handleToken: () =>
    getToken().then((token) => {
      api.defaults.headers.common["Authorization"] = token;
    }),
  linkPhoneNumber: (phoneNumber) =>
    auth.currentUser.linkWithPhoneNumber(phoneNumber),
  setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
};
export default AuthService;
