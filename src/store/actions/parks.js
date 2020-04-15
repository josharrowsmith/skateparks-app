import { GeoFirestore } from "geofirestore";
import firebase from "../../config/firebase";
import { ADD_PLACE, SET_PLACES } from "./actionTypes"


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
      dispatch({ type: ADD_PLACE, places: sortedParks });
    });

  };
};
