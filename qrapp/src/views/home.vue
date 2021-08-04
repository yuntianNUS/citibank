<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium" align='center' id= 'header'>Home</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <HomeVouchers> </HomeVouchers>
      <MerchantVouchers></MerchantVouchers>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import HomeVouchers from '../components/HomeVouchers.vue';
import MerchantVouchers from '../components/MerchantVouchers.vue'

export default  {
  name: 'Home',
  components: { HomeVouchers, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, MerchantVouchers }
}
</script>