import * as firebase from "firebase"
import "firebase/firestore";
import "firebase/app";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGEBUCKET,
  SENDER_ID,
  APP_ID
} from "react-native-dotenv";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase;
