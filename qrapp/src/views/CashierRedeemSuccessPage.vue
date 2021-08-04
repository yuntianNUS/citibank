<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cashier Redeem QR Code Success</ion-title>
      </ion-toolbar>
    </ion-header>
    <ExploreContainer name="CashierRedeemSuccessPage" />
    <ion-content>
      <ion-card>
        <ion-card-content
          >The voucher id passed through the router is:
          {{ passedVoucherId }}</ion-card-content
        >
      </ion-card>
      <ion-card>
        <ion-card-content>{{ createdAt }}</ion-card-content>
        <ion-card-content>{{ newCashierRef }}</ion-card-content>
        <ion-card-content>{{ paymentType }}</ion-card-content>
        <!-- <ion-card-content>{{userRef}}</ion-card-content>
        <ion-card-content>{{voucherTypeRef}}</ion-card-content> -->
        <ion-card-content>{{ costDollar }}</ion-card-content>
        <ion-card-content>{{ costPoints }}</ion-card-content>
        <ion-card-content>{{ count }}</ion-card-content>
        <ion-card-content>{{ image }}</ion-card-content>
        <ion-card-content>{{ merchant }}</ion-card-content>
        <ion-card-content>{{ name }}</ion-card-content>
        <ion-card-content>{{ terms.additionalDetails }}</ion-card-content>
        <ion-card-content>{{ terms.stackablePromotion }}</ion-card-content>
        <ion-card-content>{{ terms.validityDays }}</ion-card-content>
        <ion-card-content>{{ terms.validityItems }}</ion-card-content>
        <ion-card-content>{{ terms.validityOutlets }}</ion-card-content>
        <ion-card-content>{{ value }}</ion-card-content>
        <ion-card-content>{{ valueType }}</ion-card-content>
        <ion-card-content>Successfully Scanned QR Code</ion-card-content>
      </ion-card>
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
// import firebase from "firebase";

export default {
  name: "CashierRedeemSuccess",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    return {
      passedVoucherId: 0,
      createdAt: null,
      newCashierRef: null,
      paymentType: null,
      userRef: null,
      voucherTypeRef: null, //voucherType data
      costDollar: 0,
      costPoints: 0,
      count: 0,
      image: null,
      merchant: null,
      name: null,
      terms: {
        additionalDetails: null,
        stackablePromotion: null,
        validityDays: -1,
        validityItems: null,
        validityOutlets: {},
      },
      value: -1,
      valueType: null,
    };
  },
  async created() {
    this.passedVoucherId = this.$route.params.passedVoucherId;
    console.log("This passed Voucher Id is: " + this.passedVoucherId);
    await db.collection("userVoucher")
      .doc(this.passedVoucherId)
      .get()
      .then((documentSnapShot) => {
        if (documentSnapShot.exists) {
          this.createdAt = documentSnapShot.data().createdAt;
          this.newCashierRef = documentSnapShot.data().newCashierRef;
          this.paymentType = documentSnapShot.data().paymentType;
          this.userRef = documentSnapShot.data().userRef.id;
          this.voucherTypeRef = documentSnapShot.data().voucherTypeRef.id;
        }
      }); //end db.collection train
    console.log(this.voucherTypeRef)
    await this.getVoucherTypeDetails();
  },
  watch: {
    costDollar: function () {
      console.log("Waiting for voucher details...");
    },
  },
  methods: {
    getVoucherTypeDetails: async function () {
      await db.collection("voucherType")
            .doc(this.voucherTypeRef)
            .get()
            .then((voucherTypeDocumentSnapShot) => {
              console.log("Voucher Type Ref: " + (this.voucherTypeRef));
              if (voucherTypeDocumentSnapShot.exists) {
                this.costDollar = voucherTypeDocumentSnapShot.data().costDollar;
                this.costPoints = voucherTypeDocumentSnapShot.data().costPoints;
                this.count = voucherTypeDocumentSnapShot.data().count;
                this.image = voucherTypeDocumentSnapShot.data().image;
                this.merchant = voucherTypeDocumentSnapShot.data().merchant;
                this.name = voucherTypeDocumentSnapShot.data().name;
                this.terms.additionalDetails =
                  voucherTypeDocumentSnapShot.data().terms.additionalDetails;
                this.terms.stackablePromotion =
                  voucherTypeDocumentSnapShot.data().terms.stackablePromotion;
                this.terms.validityDays =
                  voucherTypeDocumentSnapShot.data().terms.validityDays;
                this.terms.validityItems =
                  voucherTypeDocumentSnapShot.data().terms.validityItems;
                this.terms.validityOutlets =
                  voucherTypeDocumentSnapShot.data().terms.validityOutlets;
                this.value = voucherTypeDocumentSnapShot.data().value;
                this.valueType = voucherTypeDocumentSnapShot.data().valueType;
              }
            }); //end voucherType train
    },
  },
};
</script>

