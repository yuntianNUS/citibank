/* Firebase */
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyA2YFfC9nviDlzDmMp75o3t3t7vYH03auA",
  authDomain: "citihack2021-87774.firebaseapp.com",
  projectId: "citihack2021-87774",
  storageBucket: "citihack2021-87774.appspot.com",
  messagingSenderId: "406392240795",
  appId: "1:406392240795:web:42075de140490e282e643e",
  measurementId: "G-S7QQ263CLG"
};
firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore();
// export const auth = firebase.auth();