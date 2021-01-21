import api from "./api";
import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBsmILT5BcTVhhwYeu13xEPaZ3WprcUDXI",
  authDomain: "darlo-dev.firebaseapp.com",
  databaseURL: "https://darlo-dev.firebaseio.com",
  projectId: "darlo-dev",
  storageBucket: "darlo-dev.appspot.com",
  messagingSenderId: "943118696270",
  appId: "1:943118696270:web:97db1d364eb16aa1d8e81f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const getToken = () => auth.currentUser.getIdToken(true);

const auth = firebase.auth();

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
      }),
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
};

export default AuthService;
