<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cart</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>        
          <router-link style="text-decoration: none; color: inherit;" to="testBuy" exact>
            <ion-subtitle class="material-icons" slot="start">
              arrow_back_ios
            </ion-subtitle>
          </router-link>
          <ion-title size="large">Cart</ion-title>
        </ion-toolbar>
        <ion-list>
          <ion-item v-for="(item, index) in cartList" :key="index">
            <ion-thumbnail slot="start">
              <img class="image" :src="item.img">
            </ion-thumbnail>
            <ion-label>
              <h2>{{item.title}}</h2>
              <p>${{item.dollar}} or {{item.points}} points</p>
              <p>Quanitity: {{item.quantity}}</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <h4>Total: </h4> 
            <h5>${{totalDollar}} or {{totalPoints}} points</h5>
          </ion-item> 
        </ion-list>
      </ion-header>
      <ion-button id='checkoutButton' @click="checkout">Check Out</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, alertController} from '@ionic/vue';
import { db } from "@/main";
import firebase from "firebase";

export default  {
  name: 'Cart',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage},
  data() {
    return {
      cartList: [],
      totalDollar: 0,
      totalPoints: 0,
      userWallet: null,
      totalCost: null,
      walletErrorMsg: "",
    }
  },
  methods: {
    fetchItems: function() {
      let cart = []
      const refList = []
      db.collection('user').doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
      .get().then(documentSnapshot => {
        if (documentSnapshot.exists) {
          cart = documentSnapshot.data().cart

          // get voucher details
          cart.forEach(ele => {
            const ref = ele.voucherTypeRef
            ref.get().then(snapshot => {
              if (snapshot.exists) {
                const refId = ref.id
                const merchRef = snapshot.data().merchant
                merchRef.get().then(s => {
                  if (s.exists) {
                    const merchantName = s.data().name
                    const title = snapshot.data().name + " " + merchantName
                    const img = snapshot.data().image
                    const dollar = snapshot.data().costDollar
                    const points = snapshot.data().costPoints
                    this.totalDollar += dollar
                    this.totalPoints += points
                    if (refList.includes(refId)) {
                      const i = refList.findIndex(function(e) {return e == refId})
                      const qty = (this.cartList[i].quantity +1)
                      this.cartList[i] = {
                        voucherTypeRef: ref,
                        title: title,
                        img: img,
                        quantity: qty,
                        dollar: dollar * qty,
                        points: points * qty,
                      }
                    } else {
                      this.cartList.push({
                        voucherTypeRef: ref,
                        title: title,
                        img: img,
                        dollar: dollar,
                        points: points,
                        quantity: 1
                      })
                      refList.push(refId)
                    }
                  }
                })
              }
            })
          })
        }
      })
    },
    checkout: function() {
      console.log('checkout')
      this.alertCheckoutMethod()
    },
    checkQty: async function() {
      let qtyFail = false
      console.log('# start checking qty')
      await Promise.all(this.cartList.map(async (ele) => {
        await ele.voucherTypeRef.get().then(snapshot => {
          if (snapshot.exists) {
            const qtyLeft = snapshot.data().count
            if (qtyLeft < ele.quantity) {
              this.qtyErrorAlert(qtyLeft, ele.title)
              qtyFail = true
            }
            console.log('%%%')
          }
        })
      }))
      console.log('returning from checkQty')
      return qtyFail
    },
    checkoutQtyConfirmation: async function(purchaseMethod) {
      const qtyFail = await this.checkQty()
      console.log(qtyFail)
      if (!qtyFail) {
        console.log('### CONFIRMATION METHOD CALLED')
        this.checkoutConfirmation(purchaseMethod)
      }
    },
    checkoutConfirmation: function(purchaseMethod) {
      // check enough cash / points
      if (this.totalCost > this.userWallet) {
        this.walletErrorAlert(purchaseMethod, this.userWallet)
      } 
      else { // transaction successful. update user wallet balance and clear cart. update voucherType count. create userVoucher instance
        console.log('transaction successful!')
        if (purchaseMethod == '$') {
          db.collection('user')
          .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
          .update({
            cart: [],
            walletBalanceDollar: firebase.firestore.FieldValue.increment(- this.totalCost),
          })
        } else if (purchaseMethod == "points") {
          db.collection('user')
          .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
          .update({
            cart: [],
            walletBalancePoints: firebase.firestore.FieldValue.increment(- this.totalCost),
          })
        }
        this.cartList.forEach(ele => {
          console.log('ELE VOUCHER NAME')
          console.log(ele.title)
          console.log(ele.quantity)
          console.log('###')
          for (let i=1; i <= ele.quantity; i++) {
            // create userVoucher instance
            const userVoucherId = db.collection('userVoucher').doc().id;
            db.collection('userVoucher').doc(userVoucherId)
            .set({
              createdAt: new Date(),
              userRef: db.doc('user/' + '4AGK7K5pWEtTSidHcpL3'), // HARDCODE TO CHANGE
              voucherTypeRef: db.doc('voucherType/' + ele.voucherTypeRef.id),
              paymentType: purchaseMethod
            });
          }
          ele.voucherTypeRef.update({
            count: firebase.firestore.FieldValue.increment(- ele.quantity),
          })
        })
        this.checkoutConfirmationAlert()
      }
    },
    async alertCheckoutMethod() {
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
                    this.totalCost = this.totalDollar
                    this.checkoutQtyConfirmation('$')
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
                    this.totalCost = this.totalPoints
                    this.checkoutQtyConfirmation('points')
                  }
                })
              }
            }
          ],
        });
      return alert.present();
    },
    qtyErrorAlert: async function (qty, title) {
      console.log('Sold Out')
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Sold Out',
          message: 'There are only ' + qty + ' "' + title + '" vouchers available for purchase',
          buttons: [{
            text: 'Ok',
          }],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
    },
    walletErrorAlert: async function (type, balance) {
      console.log('Not enough $ / points')
      if (type == "$") {
        this.walletErrorMsg = "You only have $" + balance + " reamining in your wallet. Please top up your wallet to checkout." 
      } else if (type == "points") {
        this.walletErrorMsg = "You only have " + balance + " points left. Please accumulate more points or checkout using cash." 
      }
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Insufficient Wallet Balance',
          message: this.walletErrorMsg,
          buttons: [{
            text: 'Ok',
          }],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
    },
    checkoutConfirmationAlert: async function () {
      console.log('Successfully checked out')
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Successfully',
          message: 'The voucher(s) have been purchased. You may view them in your wallet.',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.$router.go(); //REFRESH PAGE
            }
          }],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
    },
  },
  created() {
    this.fetchItems();
  },
};

</script>

<style scoped>
.material-icons {
  float: left;
  bottom: 8px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 30px;
  position: absolute;
  left: 0px
}
ion-title {
  left: 35vw;
}
ion-thumbnail {
  height: 80px;
  width: 80px;
  --border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px
}
ion-item {
  padding: 10px 0 ;
}
h5 {
  margin-left: 10px;
}
#checkoutButton {
  position: absolute;
  bottom: 70px;
  right: 30px;
}
</style>