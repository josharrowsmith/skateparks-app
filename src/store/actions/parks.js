import { GeoFirestore } from "geofirestore";
import firebase from "../../config/firebase";
import { reverseGeocodeAsync } from "expo-location";
import { ADD_PLACE, STORE_lOCATION, STORE_URLS, GET_PLACES, STORE_DETAILS, REMOVE_STORE } from "./actionTypes"
const db = firebase.firestore();
const functions = firebase.functions();


export const getParks = (radius, lat, long) => {
  //yellow bar error 
  console.disableYellowBox = true;

  return async dispatch => {
    if (radius == 0) {
      radius = 1;
    }
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

// I will fix this later
const checkVoted = async (user, parkID) => {
  console.log(parkID)
  const query = firebase
    .firestore()
    .collection("skateparks")
    .doc(parkID)
    .collection("ratings")
    .limit(100)
  const doc = await query.get();
  const users = [];
  const result = await doc.forEach((doc) => {
    if (doc.data().user == user)
      users.push(false)
  });
  return users;
}

export const addRating = (parkID, rating, user) => {
  return async dispatch => {
    const addRatings = functions.httpsCallable("ratePark");
    const validUser = await checkVoted(user, parkID)
    if (validUser && !validUser.length) {
      addRatings({ parkID, rating, user }).then((result) => {
        console.log("done");
      });
    } else {
      alert("you have already voted dude")
    }
  }
}

export const deletePark = (id) => {
  const deleteCollection = functions.httpsCallable("deleteCollection");
  deleteCollection({ id: id }).then((result) => {
    console.log(result);
  });
}

export const uploadImages = async (images, name, id) => {
  const firebaseUrl = [];
  for (let x = 0; x < images.length; x++) {
    const response = await fetch(
      "",
      {
        method: "POST",
        body: JSON.stringify({
          image: images[x].base64,
          name: name,
          id: id
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


export const addPark = (id, urls, location, details) => {
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
    geocollection.doc(id).set(doc).then(async docRef => {
      console.log("added");
    });

  }
}

export const editPark = (name, id, type) => {
  return async dispatch => {
    const query = await firebase
      .firestore()
      .collection("skateparks")
      .doc(id)
    if (type == "name") {
      query.set({
        d: { name: name }
      }, { merge: true })
    } else {
      query.set({
        d: { description: name }
      }, { merge: true })
    }

  }
}

export const goToPark = (id) => {
  return async dispatch => {
    const cityRef = firebase
      .firestore()
      .collection("skateparks")
      .doc(id);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      return doc.data();
    }
  }
}

