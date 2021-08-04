<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <ion-page>
    <ion-content :fullscreen="true" class="background-image">
      <img id='logo' src="../assets/citi-white-logo.png">
      <h2>Cashier</h2>
      <router-link style="text-decoration: none; color: inherit;" to="/cashier/signin" exact>
        <ion-button expand="round" fill="outline" color="dark">Sign In</ion-button>
      </router-link>
      <router-link style="text-decoration: none; color: inherit;" to="/cashier/registration" exact>
        <ion-button expand="round" fill="outline" color="dark">Register</ion-button>
      </router-link>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, alertController} from '@ionic/vue';


export default  {
  name: 'Cart',
  components: {IonContent, IonPage},
  data() {
    return {
    }
  },
  methods: {
  },
};
</script>

<style scoped>
ion-content {
  --background: url('../assets/bluewave.jpg') 0 0/100% 100% no-repeat;
}
#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  margin-top: 30vh;
}

h2 {
  margin-top: 0;
  margin-bottom: 10vh;
  text-align: center;
}

ion-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  margin-bottom: 10px;
}

p {
  text-align: center;
}
</style>