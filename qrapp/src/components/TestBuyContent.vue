<template>
  <div id="container">
    <ul>
      <button @click="addCartNum-=1" :disabled="addCartNum == 0"><li class="material-icons" id="decrease">
        remove_circle
      </li></button>
      <li><h3 id="cart-num">{{addCartNum}}</h3></li>
      <li class="material-icons" id="increase" v-on:click="addCartNum+=1">
        add_circle
      </li>
    </ul>
    <br>
    <ion-button id="cartButton" v-if="(!codeDisplay) && (!errorDisplay)" @click="toCart" :disabled="addCartNum <= 0">Add to Cart</ion-button>
    <ion-button v-if="(!codeDisplay) && (!errorDisplay)" @click="alertBuyMethod">Buy Now</ion-button>
    <ion-card v-if=codeDisplay>
      <ion-card-header>
        <ion-item>
          <ion-icon name="close-sharp" slot="end" @click="closeCode"></ion-icon>
        </ion-item>
        <ion-card-title>{{voucherName}}</ion-card-title>
        <ion-card-subtitle><br>Valid {{voucherValidityDays}} days</ion-card-subtitle>
      </ion-card-header>
      <qrcode-vue :value=userVoucherId :size="200" level="H" />
      <ion-card-content>
        Show this QR Code to <br> the staff at the counter. <br>
        <br> Wallet Balance: {{walletBalanceMsg}}
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
        {{errorMsgLong}}
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
      errorMsgLong: '',
      voucherTypeId: 'IeFsdsKI61bSXrr4106Z', // HARDCODE TO CHANGE
      voucherName: '',
      voucherValidityDays: null,
      voucherCost: null,
      voucherCostDollar: null,
      voucherCostPoints: null,
      voucherCount: null,
      userWallet: null,
      userCartCount: null,
      walletBalanceMsg: '',
      addCartNum: 0,
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
            this.voucherCostDollar = documentSnapshot.data().costDollar
            this.voucherCostPoints = documentSnapshot.data().costPoints
            this.voucherCount = documentSnapshot.data().count
          }
        })
      db.collection('user')
        .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            this.userCartCount = documentSnapshot.data().cart.length
          }
        })
    },
    toCart: async function () {
      // update user's cart
      const addCartList = []
      for (let i = 1; i <= this.addCartNum; i++) {
        console.log('ADD')
        const cartItem = {
          voucherTypeRef: db.doc('voucherType/' + this.voucherTypeId),
          creationDate: new Date(),
          randomNum: Math.random(), // as arrayunion wont addd duplicate entries
        }
        addCartList.push(cartItem)
      }

      console.log(addCartList)

      await db.collection('user')
      .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
      .update({
        cart: firebase.firestore.FieldValue.arrayUnion.apply(this, addCartList)
      }).then(() => {
        this.userCartCount += this.addCartNum
        this.cartConfirmationAlert()
      })
    },
    cartConfirmationAlert: async function () {
      console.log('Added to cart')
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Added to Cart',
          message: 'The voucher(s) have been successfully added to the cart',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.$router.go(); //REFRESH PAGE TO UPDATE CART NUMBER. SHOULD CHANGE TO EMIT
            }
          }],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
    },
    buyNowDisplay: function (purchaseMethod) {
      // check if wallet has sufficient points & sufficient quantity
      // NOTE: cashier to check if user bought
      console.log('###')
      console.log(purchaseMethod)
      console.log('###')

      console.log('#Wallet#')
      console.log(this.userWallet)
      console.log('#Wallet#')
      
      console.log('#Voucher Cost#')
      console.log(this.voucherCost)
      console.log('#VoucherCost#')
      if (this.voucherCount <= 0) {
        this.codeDisplay = false;
        this.errorDisplay = true;
        this.errorMsg = 'Sold Out'
        this.errorMsgLong = 'This voucher has been fully purchased! Do check out the other vouchers available instead.'
      } else if (this.userWallet < this.voucherCost) {
        this.codeDisplay = false;
        this.errorDisplay = true;
        this.errorMsg = 'Insufficient Wallet Balance'
        if (purchaseMethod == '$') {
          this.errorMsgLong = 'This voucher costs $' + this.voucherCost + 
        ' but you currently only have $' + this.userWallet + ' stored in your wallet.'
        } else if (purchaseMethod == 'points') {
          this.errorMsgLong = 'This voucher costs ' + this.voucherCost + 
        ' points but you currently only have ' + this.userWallet + ' points.'
        }
      } else { // sufficient points/cash, transaction goes through
        // create userVoucher instance
        this.userVoucherId = db.collection('userVoucher').doc().id;
        db.collection('userVoucher').doc(this.userVoucherId)
        .set({
          createdAt: new Date(),
          userRef: db.doc('user/' + '4AGK7K5pWEtTSidHcpL3'), // HARDCODE TO CHANGE
          voucherTypeRef: db.doc('voucherType/' + this.voucherTypeId),
          paymentType: purchaseMethod
        });

        // update voucherType's count
        db.collection('voucherType').doc(this.voucherTypeId)
        .update({
          count: firebase.firestore.FieldValue.increment(- 1),
        })

        // user: update vouchers and wallet balance
        if (purchaseMethod == '$') {
          db.collection('user')
          .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
          .update({
            walletBalanceDollar: firebase.firestore.FieldValue.increment(-this.voucherCost)
          })
          this.walletBalanceMsg = '$' + (this.userWallet - this.voucherCost)
        } else if (purchaseMethod == 'points') {
          db.collection('user')
          .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
          .update({
            walletBalancePoints: firebase.firestore.FieldValue.increment(-this.voucherCost)
          })
          this.walletBalanceMsg = (this.userWallet - this.voucherCost) + ' points'
        }
        this.codeDisplay = true;
      }

      console.log('%%% Display')
      console.log(this.codeDisplay)
    },
    closeCode: function () {
      this.codeDisplay = false;
    },
    closeError: function () {
      this.errorDisplay = false;
    },
    async alertBuyMethod() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Purchase Options',
          //subHeader: 'Subtitle',
          //message: 'This is an alert message.',
          buttons: [
            {
              text: 'Cash',
              handler: () => {
                console.log('Cash Chosen')
                db.collection('user')
                .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
                .get()
                .then(documentSnapshot => {
                  if (documentSnapshot.exists) {
                    this.userWallet = documentSnapshot.data().walletBalanceDollar
                    this.voucherCost = this.voucherCostDollar
                    this.buyNowDisplay('$')
                  }
                })
              }
            }, 
            {
              text: 'Points',
              handler: () => {
                console.log('Points Chosen')
                db.collection('user')
                .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
                .get()
                .then(documentSnapshot => {
                  if (documentSnapshot.exists) {
                    this.userWallet = documentSnapshot.data().walletBalancePoints
                    this.voucherCost = this.voucherCostPoints
                    this.buyNowDisplay('points')
                    console.log('CHECK')
                    console.log(this.userWallet)
                    console.log('CHECK')
                  }
                })
              }
            }
          ],
        });
      return alert.present();
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

#increase {
  font-size: 30px;
  position: relative;
  bottom: -15px;
}

#decrease {
  font-size: 30px;
  position: relative;
  bottom: -15px;
}

ul,li {
  list-style: none;
  position: relative;
  bottom: -15px;
}

li {
  float: left;
  margin: 0;
}

h3 {
  padding: 0px 10px;
  position: relative;
  bottom: 13px;
  left: -20px;
}

button {
  background: none;
  padding: 0;
  float:left;
}

#cartButton {
  position: relative; 
  left: -10px;
}
</style>