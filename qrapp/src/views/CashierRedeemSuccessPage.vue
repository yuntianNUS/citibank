<template>
  <firebase></firebase>
  <db></db>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cashier Redeem QR Code Success</ion-title>
      </ion-toolbar>
    </ion-header>
    <ExploreContainer name="CashierRedeemSuccessPage" />
    <ion-content>
      <p>The voucher id passed through the router is: {{passedVoucherId}}</p>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { db } from "@/main";
import firebase from "firebase";

export default {
  name: 'CashierRedeemSuccess',
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    db,
    firebase,
  },
  data(){
    return {
      passedVoucherId: 0
    }
  },
  created() {
    this.passedVoucherId = this.$route.params.voucherId
    console.log("This passed Voucher Id is: " + this.passedVoucherId)
  }
};
</script>

