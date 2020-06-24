import { GeoFirestore } from "geofirestore";
import firebase from "../../config/firebase";
import { ADD_PLACE, SET_PLACES, SET_LOCATION } from "./actionTypes"
import { setLocation } from "./location"

export const getParks = (radius, lat, long) => {
  //yellow bar error 
  console.disableYellowBox = true;
  return async dispatch => {
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
        if (typeof snapshot.docChanges()[i] !== 'undefined') {
          let { doc } = snapshot.docChanges()[i];
          let park = {
            ...snapshot.docs[i].data(),
            distance: doc.distance,
            id: snapshot.docs[i].id
          };
          parks.push(park)
        }
      }

      const sortedParks = parks.sort(function (a, b) {
        return a.distance - b.distance;
      });

      dispatch({ type: ADD_PLACE, places: sortedParks });
    });

  };
};

// User can only vote once
const checkVoted = async (user, parkID) => {
  const query = firebase
    .firestore()
    .collection("skateparks")
    .doc(parkID)
    .collection("ratings")
    .limit(100)
  const doc = await query.get();
  const stuff = [];
  const result = await doc.forEach((doc) => {
    if (doc.data().user == user)
      stuff.push(false)
  });
  return stuff;
}

// Adds a rating
export const addRating = (parkID, rating, user) => {
  return async dispatch => {
    const collection = firebase.firestore().collection("skateparks");
    const document = collection.doc(parkID);
    const newRatingDocument = document.collection("ratings").doc();
    const validUser = await checkVoted(user, parkID)
    if (validUser && !validUser.length) {
      return firebase.firestore().runTransaction(transaction => {
        return transaction.get(document).then(doc => {
          const data = doc.data();
          const newAverage =
            (data.d.numRatings * data.d.avgRating + rating) /
            (data.d.numRatings + 1);
          transaction.set(document, {
            d: {
              numRatings: data.d.numRatings + 1,
              avgRating: newAverage,
            }
          }, { merge: true });
          return transaction.set(newRatingDocument, { rating: rating, user: user });
        });
      });
    }
  }
}