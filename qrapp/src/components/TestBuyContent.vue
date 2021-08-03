<template>
  <div id="container">
    <strong v-if="(!codeDisplay) && (!errorDisplay)">{{ name }}</strong><br>
    <ion-button v-if="(!codeDisplay) && (!errorDisplay)" @click="toCart">Add to Cart</ion-button>
    <ion-button v-if="(!codeDisplay) && (!errorDisplay)" @click="buyNow">Buy Now</ion-button>
    <ion-card v-if=codeDisplay>
      <ion-card-header>
        <ion-item>
          <ion-icon name="close-sharp" slot="end" @click="closeCode"></ion-icon>
        </ion-item>
        <ion-card-title>{{voucherName}}</ion-card-title>
        <ion-card-subtitle><br>Valid {{voucherValidityDays}} days</ion-card-subtitle>
      </ion-card-header>
      <qrcode-vue :value=voucherId :size="200" level="H" />
      <ion-card-content>
        Show this QR Code to <br> the staff at the counter. <br>
        {{userWallet - voucherCost}} points left.
      </ion-card-content>
    </ion-card>
    <ion-card v-if=errorDisplay>
      <ion-card-header>
        <ion-item>
          <ion-icon name="close-sharp" slot="end" @click="closeError"></ion-icon>
        </ion-item>
      </ion-card-header>
      <ion-card-title><br><br><br>{{errorMsg}}</ion-card-title>
      <ion-card-content>
        This voucher costs {{voucherCost}} points but <br> you currently only have {{userWallet}} points.
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, alertController} from '@ionic/vue';
import { defineComponent } from 'vue';
import { db } from "@/main";
import {warning} from 'ionicons/icons';
import firebase from "firebase";
import QrcodeVue from 'qrcode.vue';

export default defineComponent({
  name: 'TestBuyContent',
  props: {
    name: String
  },
  components: { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, QrcodeVue},
  setup() {
    return { warning };
  },
  data(){
    return{
      codeDisplay: false,
      errorDisplay: false,
      errorMsg: '',
      voucherTypeId: 'IeFsdsKI61bSXrr4106Z', // HARDCODE TO CHANGE
      voucherName: '',
      voucherValidityDays: null,
      voucherCost: null,
      voucherId: null,
      userWallet: null,
      userCartCount: null,
    }
  }, 
  methods: {
    fetchItems: function () {
      console.log('fetch items called')      
      db.collection('voucherType')
        .doc(this.voucherTypeId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            this.voucherName = documentSnapshot.data().name
            this.voucherValidityDays = documentSnapshot.data().terms.validityDays
            this.voucherCost = documentSnapshot.data().cost
          }
        })
      db.collection('user')
        .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            this.userCartCount = documentSnapshot.data().cart.length
            console.log('cart count')
            console.log(this.userCartCount)
          }
        })
    },
    toCart: function () {
      // update user's cart
      db.collection('user')
      .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
      .update({
        cart: firebase.firestore.FieldValue.arrayUnion(db.doc('voucherType/' + this.voucherTypeId)),
      })
      this.userCartCount += 1
      this.cartConfirmationAlert()
      this.$emit('addCartClicked', this.userCartCount)
    },
    buyNow: function () {
      console.log('Buy Now Button Pressed')
      // get most up to date userWallet info
      db.collection('user')
        .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            this.userWallet = documentSnapshot.data().walletBalance

            console.log('### USER WALLET')
            console.log(this.userWallet)
            console.log('### USER WALLET')

            // check if wallet has sufficient points
            if (this.userWallet < this.voucherCost && this.userWallet && this.voucherCost) {
              this.errorDisplay = true;
              this.errorMsg = 'NOT ENOUGH POINTS'
            }
            else { // sufficient points, transaction goes through
              // create voucher instance
              this.voucherId = db.collection('voucher').doc().id;
              db.collection('voucher').doc(this.voucherId)
              .set({
                purchased: true,
                redeemed: false,
                voucherType: db.doc('voucherType/' + this.voucherTypeId)
              });

              // update voucherType's voucherIds field
              db.collection('voucherType').doc(this.voucherTypeId)
              .update({
                voucherIds: firebase.firestore.FieldValue.arrayUnion(db.doc('voucher/' + this.voucherId)),
              })

              // user: update vouchers and wallet balance
              db.collection('user')
              .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
              .update({
                vouchers: firebase.firestore.FieldValue.arrayUnion(db.doc('voucher/' + this.voucherId)),
                walletBalance: (this.userWallet - this.voucherCost)
              })
              this.codeDisplay = true;
            }
          }
        })
    },
    closeCode: function () {
      this.codeDisplay = false;
    },
    closeError: function () {
      this.errorDisplay = false;
    },
    cartConfirmationAlert: async function () {
      console.log('Add to cart')
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Added to Cart',
          message: 'The voucher has been successfully added to the cart',
          buttons: ['Ok'],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
    },
  },
  created() {
    this.fetchItems();
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

ion-card {
  height: 60vh;
}
</style>