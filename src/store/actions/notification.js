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


export const getParks = async (radius, location) => {
  const lat = location[0].coords.latitude;
  const long = location[0].coords.longitude;
  const firestore = firebase.firestore();
  const geofirestore = new GeoFirestore(firestore);
  const geocollection = geofirestore.collection("skateparks");

  let query = await geocollection.limit(50).near({
    center: new firebase.firestore.GeoPoint(lat, long),
    radius
  });

  let docQuery = await query.onSnapshot(snapshot => {
    let parks = [];

    for (let i = 0; i < snapshot.docs.length; i++) {
      let { doc } = snapshot.docChanges()[i];
      let park = {
        ...snapshot.docs[i].data(),
        distance: doc.distance,
        id: snapshot.docs[i].id
      };
      parks.push(park);
    }

    // Doesnt sort
    const newdata = parks.sort(function(a, b) {
      return a.distance - b.distance;
    });

    newdata.forEach(i => {
      Msg(i.name, i.distance);
    });
  });
};
