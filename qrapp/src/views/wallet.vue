<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Your Wallet</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium" align='center' id= 'header'> Your Wallet <br> </ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="float-container">

        <div class="float-child green">
          <div><p class='text'>{{walletPoints}}</p> <p class='smalltext'> points </p> </div>
        </div>
        
        <div class="float-child blue">
          <div><p class= 'text'> {{walletDollar}} </p> <p class='smalltext'> SGD </p> </div>
        </div>
        
      </div>
      <HomeVouchers> </HomeVouchers>
      <RedeemedVouchers></RedeemedVouchers>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import HomeVouchers from '../components/HomeVouchers.vue';
import RedeemedVouchers from '../components/RedeemedVouchers.vue'
import { defineComponent } from '@vue/runtime-core';
import {db} from '../main';

export default defineComponent({
  name: 'Home',
  components: { HomeVouchers, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, RedeemedVouchers },
  data(){
    return{
      walletPoints: "",
      walletDollar: "",
    }

  },
  methods:{
    fetchPoints: function(){
      db
      .collection("user")
      .get()
      .then(snapshot => {
        snapshot.forEach(snapshot2 => {
          if(snapshot2.data().name == 'Sabrina'){
            this.walletPoints = snapshot2.data().walletBalancePoints
            this.walletDollar = snapshot2.data().walletBalanceDollar 
          }
        })

      })
    }
  },
  mounted(){
    this.fetchPoints()
  }
})
</script>
<style scoped>
.float-container {
    border: 3px solid #fff;
    padding-left: 5%;
    padding-top:5%;
}
.green{
  background-color:#020358;
}
.blue{
  background-color:#355B97;
}

.float-child {
   text-align:center;
    width: 45%;
    margin-right:5%;
    float: left;
    padding: 10px;
    border-radius: 10px;
    color:white;
    height: 10em;
    /* background-color: black; */
}  

.text{
  font-size: 40px;
  font-weight:bold;
}
.smalltext{
  margin-top:-20%;
}

</style>