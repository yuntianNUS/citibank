<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <ion-page>
    <ion-content :fullscreen="true" class="background-image">
      <img id='logo' src="../assets/citi-white-logo.png">
      <ion-button expand="round" fill="outline" color="dark">Sign In</ion-button>
      <ion-button expand="round" fill="outline" color="dark">Register</ion-button>
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
  margin-bottom: 15vh;
}

ion-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  margin-bottom: 10px;
}
</style>