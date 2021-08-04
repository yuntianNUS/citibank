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
  apiKey: "AIzaSyA2YFfC9nviDlzDmMp75o3t3t7vYH03auA",
  authDomain: "citihack2021-87774.firebaseapp.com",
  projectId: "citihack2021-87774",
  storageBucket: "citihack2021-87774.appspot.com",
  messagingSenderId: "406392240795",
  appId: "1:406392240795:web:42075de140490e282e643e",
  measurementId: "G-S7QQ263CLG"
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