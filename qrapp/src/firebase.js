/* Firebase */
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyB12HK3OWg8WnelP67CVJfIQRCUHtHTsIo",
  authDomain: "citihackathon2021.firebaseapp.com",
  projectId: "citihackathon2021",
  storageBucket: "citihackathon2021.appspot.com",
  messagingSenderId: "672053069671",
  appId: "1:672053069671:web:c479a8553dc752209051c2",
  measurementId: "G-T25QY5E5F1"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
// firebase.initializeApp(firebaseConfig);
// export const database = firebase.firestore();
export const auth = firebase.auth();