import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import firebase from 'firebase/app'
import 'firebase/firestore'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';





const firebaseConfig = {
  apiKey: "AIzaSyB12HK3OWg8WnelP67CVJfIQRCUHtHTsIo",
  authDomain: "citihackathon2021.firebaseapp.com",
  projectId: "citihackathon2021",
  storageBucket: "citihackathon2021.appspot.com",
  messagingSenderId: "672053069671",
  appId: "1:672053069671:web:c479a8553dc752209051c2",
  measurementId: "G-T25QY5E5F1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});