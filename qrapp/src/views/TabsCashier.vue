<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>

        <ion-tab-button tab="tab3" href="/tabs/cashier/profile">
          <ion-icon :icon="square" />
          <ion-label>Profile</ion-label>
          </ion-tab-button>


        <ion-tab-button tab="CashierScan" href="/tabs/cashier/CashierScan">
          <ion-icon :icon="ellipse"/>
          <ion-label>Scan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="scannedVouchers" href="/tabs/cashier/scannedVouchers">
          <ion-icon :icon="triangle" />
          <ion-label>Scanned Vouchers</ion-label>
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