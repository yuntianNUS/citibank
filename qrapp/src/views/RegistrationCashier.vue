<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <ion-page>
    <ion-content :fullscreen="true" class="background-image">
      <img id='logo' src="../assets/citi-white-logo.png">
      <h2>Cashier</h2>
      <input placeholder="Name" v-model="name"/>
      <input color="light" placeholder="Email" v-model="email"/>
      <input color="light" type="password" placeholder="Password" v-model="password"/>
      <br>
      <ion-button expand="round" fill="outline" color="dark" @click="register">Register</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton} from '@ionic/vue';
import { db } from "@/main";
import { auth } from "@/firebase/";

export default  {
  name: 'Cart',
  components: {IonContent, IonPage, IonButton},
  data() {
    return {
      name: "",
      email: "",
      password: "",
    }
  },
  methods: {
    register: function () {
      auth.createUserWithEmailAndPassword('_cashier_' + this.email, this.password);
      db.collection('cashier').doc(this.email).set({
        email: this.email,
        name: this.name,
        image:"https://www.pngitem.com/pimgs/m/80-802775_transparent-background-user-png-png-download.png"
      }).then(() => {
        this.$router.push("/tabs/cashier/") // TO ADD CASHIER ROUTER
      })
    }
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
  margin-top: 20vh;
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

input {
  background-color: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  height: 2.5em;
  margin-bottom: 10px;
  border-radius: 10px;
  padding-left: 20px;
  border-color: transparent;
  color: #545454;
}
</style>