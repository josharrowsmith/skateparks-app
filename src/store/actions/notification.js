/* eslint-disable */
import firebase from "../../config/firebase";
import { GeoFirestore } from "geofirestore";


export const Msg = async (radius, location, userId) => {
  console.disableYellowBox = true;
  const db = firebase.firestore();
  let tokens = [];
  const token = await db.collection("users").doc(userId).get().then(snapshot => {
    return snapshot.data().notificationToken;
  })
  getTheParks(radius, location, token);
}


const getTheParks = async (radius, location, token) => {
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

    const sortedParks = parks.sort(function (a, b) {
      return a.distance - b.distance;
    });
    sortedParks.forEach(i => {
      SendMessage(token, i.name, i.distance.toFixed(2));
    });
  });
}

const SendMessage = async (token, name, distance) => {
  console.log(token, name, distance)

  const message = {
    to: token,
    sound: 'default',
    title: name,
    body: distance,
    data: { data: 'goes here' },
    android: {
      channelId: "test"
    },
  };
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

