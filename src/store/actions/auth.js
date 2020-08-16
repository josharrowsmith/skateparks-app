import { AsyncStorage } from 'react-native';
import { LOGOUT, AUTHENTICATE, SET_DID_TRY_AL } from "./actionTypes"
import firebase from "../../config/firebase";
import { API_KEY } from "react-native-dotenv";
const db = firebase.firestore();

let timer;

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};


export const authenticate = (userId, token, refresh, expiryTime, email) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token, refresh: refresh, email: email, admin: false });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                resData.refresh_token,
                parseInt(resData.expiresIn) * 1000,
                email,
            )
        );
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, resData.refresh_token, expirationDate, email);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                resData.refreshToken,
                parseInt(1 * 1000 * 3600 * 24),
                email
            )
        );
        const expirationDate = new Date(
            new Date().getTime() + parseInt(1 * 1000 * 3600 * 24),
        );
        saveDataToStorage(resData.idToken, resData.localId, resData.refreshToken, expirationDate, email);
    };
};


export const checkIfAdmin = (token) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: token
                })
            }
        )
        if (!response.ok) {
            const errorResData = await response.json();
        }
        const resData = await response.json();
        const result = resData.users[0].customAttributes;
        return result;
    };
}

// Google Sign 
export const onSignIn = (idToken, accessToken) => {
    return async dispatch => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
        );
        // Sign in with credential from the Google user.
        firebase
            .auth()
            .signInWithCredential(credential)
            .then(response => {
                response.getIdToken().then(newidToken => {
                    dispatch(
                        authenticate(
                            response.uid,
                            newidToken,
                            accessToken,
                             parseInt(1 * 1000 * 3600 * 24),
                            response.email,
                        )
                    );
                    const expirationDate = new Date(
                        new Date().getTime() +  parseInt(1 * 1000 * 3600 * 24)
                    );
                    saveDataToStorage(newidToken, response.uid, accessToken, expirationDate, response.email);
                })
            })
            .catch(function (error) {
                alert(JSON.stringify(error));
            });
    }

};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

// Token only last One hour so i will need to refresh it or rebuild auth 
export const refreshToken = () => {
    return async dispatch => {
        const userData = await AsyncStorage.getItem("userData");
        const transformedData = JSON.parse(userData);
        const { token, refresh, email } = transformedData;
        const response = await fetch(
            `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grant_type: 'refresh_token',
                    refresh_token: refresh
                })
            }
        )
        if (!response.ok) {
            const errorResData = await response.json();
            console.log(errorResData)
        }
        const resData = await response.json();
        dispatch(
            authenticate(
                resData.user_id,
                resData.id_token,
                resData.refresh_token,
                parseInt(resData.expires_in) * 1000,
                email
            )
        );
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expires_in) * 1000
        );
        saveDataToStorage(resData.id_token, resData.user_id, resData.refresh_token, expirationDate, email);
    };
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
      timer = setTimeout(() => {
        alert(JSON.stringify(expirationTime))
        dispatch(logout());
      }, expirationTime);
    };
  };
  

const saveDataToStorage = (token, userId, refresh, expirationDate, email) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            refresh: refresh,
            expiryDate: expirationDate.toISOString(),
            email: email
        })
    );
};

export const notificationToken = (token, getState) => {
    return async (dispatch, getState) => {
        // any async code you want!
        const userId = getState().auth.userId;
        const email = getState().auth.email
        db.collection('users').doc(userId).set({
            notificationToken: token,
            name: email
        })
    }
}
