/* eslint-disable */
import { GeoFirestore } from "geofirestore";
import firebase from "../../config/firebase";

// Sends the notification
export const Msg = async (name, distance) => {
  const db = firebase.firestore();
  db.collection("users").doc("IDs").get().then(snapshot => {
    const token = snapshot.data().token;
    fetch("https://exp.host/--/api/v2/push/send", {
      body: JSON.stringify({
        to: token,
        title: name,
        channelId: "test",
        priority: "high"
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
  })
};