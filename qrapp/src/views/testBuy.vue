<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Test Buy</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Test Buy</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <TestBuyContent name="Test Buy Page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import TestBuyContent from '../components/TestBuyContent.vue';

export default  {
  name: 'testBuy',
  components: { TestBuyContent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
};

</script>