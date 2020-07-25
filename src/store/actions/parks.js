import { GeoFirestore } from "geofirestore";
import firebase from "../../config/firebase";
import { reverseGeocodeAsync } from "expo-location";
import { ADD_PLACE, STORE_lOCATION, STORE_URLS, GET_PLACES, STORE_DETAILS, REMOVE_STORE } from "./actionTypes"
const db = firebase.firestore();

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

      dispatch({ type: GET_PLACES, places: sortedParks });
    });

  };
};

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
            (data.d.numRatings * data.d.rating + rating) /
            (data.d.numRatings + 1);
          transaction.set(document, {
            d: {
              numRatings: data.d.numRatings + 1,
              rating: newAverage,
            }
          }, { merge: true });
          return transaction.set(newRatingDocument, { rating: rating, user: user });
        });
      });
    } else {
      console.log("cant vote")
    }
  }
}

export const deletePark = (id) => {
  return db.collection('skateparks').doc(id).delete();
}

export const uploadImages = async (images, name) => {
  const firebaseUrl = [];
  for (let x = 0; x < images.length; x++) {
    const response = await fetch(
      "",
      {
        method: "POST",
        body: JSON.stringify({
          image: images[x].base64,
          name: name
        })
      }
    );
    const data = await response.json();
    const imageurl = await data.imageUrl;
    firebaseUrl.push(await imageurl);
  }
  return Promise.all(firebaseUrl);
}

export const storeUrls = (urls) => {
  return dispatch => {
    dispatch({ type: STORE_URLS, urls: urls });
  };
};

export const storeLocation = (lat, lng) => {
  const location = {
    latitude: lat,
    longitude: lng
  }
  return dispatch => {
    dispatch({ type: STORE_lOCATION, location });
  };
};

export const storeDetails = (name, desc, rating) => {
  const details = {
    name: name,
    description: desc,
    rating: rating
  }
  return dispatch => {
    dispatch({ type: STORE_DETAILS, details });
  };
};

export const clearData = () => {
  return async (dispatch, getState) => {
    const places = getState().places.places;
    dispatch({ type: REMOVE_STORE, places });
  };
};



export const addPark = (urls, location, details) => {
  return async dispatch => {
    const lats = location.latitude
    const lng = location.longitude
    const doc = {
      name: details.name,
      images: urls,
      description: details.description,
      coordinates: new firebase.firestore.GeoPoint(lats, lng),
      rating: details.rating,
      numRatings: 1
    };

    const geofirestore = new GeoFirestore(firebase.firestore());
    const geocollection = geofirestore.collection("skateparks");
    geocollection.add(doc).then(async docRef => {
      console.log("added");
    });

  }
}