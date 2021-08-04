<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium" align='center' id= 'header'> Profile <br> </ion-title>
        </ion-toolbar>
      </ion-header>
      <Profile> </Profile>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Profile from '../components/Profile.vue'
import { defineComponent } from '@vue/runtime-core';

export default  defineComponent({
  name: 'Tab3',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Profile }
})
</script>