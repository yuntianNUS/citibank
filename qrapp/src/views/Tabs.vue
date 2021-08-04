<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon :icon="triangle" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/wallet">
          <ion-icon :icon="ellipse" />
          <ion-label>Wallet</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/profile">
          <ion-icon :icon="square" />
          <ion-label>Profile</ion-label>
          </ion-tab-button>
        <ion-tab-button tab="testBuy" href="/tabs/testBuy">
          <ion-icon :icon="square" />
          <ion-label>Buy</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="CashierScan" href="/tabs/CashierScan">
          <ion-icon :icon="qr-scanner"/>
          <ion-label>Scan</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { ellipse, square, triangle } from "ionicons/icons";

export default {
  name: "Tabs",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      ellipse,
      square,
      triangle,
    };
  },
};
</script>