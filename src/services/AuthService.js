import api from "./api";
import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAp5a5Arj_VjLgtxu2XSwOLOASwssNEsJ0",
  authDomain: "laboratorio-cognicion.firebaseapp.com",
  projectId: "laboratorio-cognicion",
  storageBucket: "laboratorio-cognicion.appspot.com",
  messagingSenderId: "123125382179",
  appId: "1:123125382179:web:5c481706e6773a38c08596",
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
