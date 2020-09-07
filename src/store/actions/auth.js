import { AsyncStorage } from 'react-native';
import { LOGOUT, AUTHENTICATE, SET_DID_TRY_AL } from "./actionTypes"
import firebase from "../../config/firebase";
import { API_KEY } from "react-native-dotenv";
const db = firebase.firestore();

let timer;

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};


export const authenticate = (userId, token, refresh, expiryTime, email, admin) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token, refresh: refresh, email: email, admin: admin });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const auth = await firebase.auth().createUserWithEmailAndPassword(email, password)
            const { claims, token } = await firebase.auth().currentUser.getIdTokenResult();
            dispatch(
                authenticate(
                    auth.user.uid,
                    token,
                    null,
                    parseInt(3600 * 1000),
                    auth.user.email,
                    claims.admin
                )
            );
            const expirationDate = new Date(
                new Date().getTime() + parseInt(3600 * 1000),
            );
            saveDataToStorage(token, auth.user.uid, null, expirationDate, auth.user.email, claims.admin);
        } catch (err) {
            alert(err);
        }
    };
};


export const login = (email, password) => {
    return async dispatch => {
        try {
            const auth = await firebase.auth().signInWithEmailAndPassword(email, password)
            const { claims, token } = await firebase.auth().currentUser.getIdTokenResult();
            dispatch(
                authenticate(
                    auth.user.uid,
                    token,
                    null,
                    parseInt(7 * 1000 * 3600 * 24),
                    auth.user.email,
                    claims.admin
                )
            );
            const expirationDate = new Date(
                new Date().getTime() + parseInt(7 * 1000 * 3600 * 24),
            );
            saveDataToStorage(token, auth.user.uid, null, expirationDate, auth.user.email, claims.admin);
        } catch (err) {
            alert(err)
        }

    }
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
            alert(errorResData)
        }
        const resData = await response.json();
        const result = resData.users[0].customAttributes;
        const admin = JSON.parse(result);
        return admin.admin;
    };
}

// Google Sign 
export const onSignIn = (idToken, accessToken) => {
    return async dispatch => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
        );
        try {
            const auth = await firebase.auth().signInWithCredential(credential)
            const { claims, token } = await firebase.auth().currentUser.getIdTokenResult();
            dispatch(
                authenticate(
                    auth.user.uid,
                    token,
                    null,
                    parseInt(7 * 1000 * 3600 * 24),
                    auth.user.email,
                    claims.admin
                )
            );
            const expirationDate = new Date(
                new Date().getTime() + parseInt(7 * 1000 * 3600 * 24),
            );
            saveDataToStorage(token, auth.user.uid, null, expirationDate, auth.user.email, claims.admin);
        } catch (err) {
            alert(err);
        }
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
            dispatch(logout());
        }, expirationTime);
    };
};


const saveDataToStorage = (token, userId, refresh, expirationDate, email, admin) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            refresh: refresh,
            expiryDate: expirationDate.toISOString(),
            email: email,
            admin: admin
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
