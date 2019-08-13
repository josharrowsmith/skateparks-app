import {
  SESSION_LOADING,
  SESSION_RESTORING,
  SESSION_SUCCESS,
  SESSION_LOGOUT,
  SESSION_ERROR,
  SIGNUP_SUCCESS
} from "./actionTypes";
import firebase from "../../config/firebase";

export const restoreSession = () => dispatch => {
  dispatch(sessionLoading());
  dispatch(sessionRestoring());

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(sessionSuccess(user));
    } else {
      dispatch(sessionLogout());
    }
  });
};

export const loginUser = auth => dispatch => {
  dispatch(sessionLoading());
  firebase
    .auth()
    .signInWithEmailAndPassword(auth.email, auth.password)
    .then(user => {
      dispatch(sessionSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const signupUser = auth => dispatch => {
  dispatch(sessionLoading());
  firebase
    .auth()
    .createUserWithEmailAndPassword(auth.email, auth.password)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const logoutUser = () => dispatch => {
  dispatch(sessionLoading());

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(sessionLogout());
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

const sessionRestoring = () => ({
  type: SESSION_RESTORING
});

const sessionLoading = () => ({
  type: SESSION_LOADING
});

const sessionSuccess = user => ({
  type: SESSION_SUCCESS,
  user
});

const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  user
});

const sessionError = error => ({
  type: SESSION_ERROR,
  error
});

const sessionLogout = () => ({
  type: SESSION_LOGOUT
});
