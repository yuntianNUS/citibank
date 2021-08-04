<template>
  <ion-button @click="presentAlert">Show Alert</ion-button>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cashier Scan QR Code</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer name="Cashier Scan Page" />
      <p class="decode-result">
        The QR Code Id is: <b>{{ result }}</b>
      </p>

      <div class="w-3/4 h-full m-auto">
        <qrcode-stream
          :camera="camera"
          @decode="onDecode"
          @init="onInit"
        ></qrcode-stream>
      </div>
      <p>The Voucher ID is:{{ userVoucherPresentedId }}</p>
    </ion-content>
  </ion-page>
</template>

<script lang="js">

import { alertController } from '@ionic/vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { QrcodeStream} from 'vue3-qrcode-reader'
import { db } from "@/main";
// import firebase from "firebase";
// import router from "../router"

export default  {
  name: 'CashierScan',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, QrcodeStream},
  data(){
    return{
      userVoucherPresentedId: "None",
      camera: 'auto',
      result: null,
      showScanConfirmation: false,
      createdAt: null,
      paymentType: null,
      userRef: null,
      voucherTypeRef: null,
      isApplicationVoucher: false,
      isVoucherValid: false
    }
  }, 

  methods: {
    checkIsOurApplicationVoucher() {
      db.collection('userVoucher')
        .doc('userVoucher')
        .get()
        .then(doc => {
          this.checkIsOurApplicationVoucher = true
          return doc.exists
        })
    },
    checkHasVoucherBeenRedeemed() {
      db.collection('userVoucher')
          .doc(this.result)
          .get()
          .then(documentSnapShot => {
            console.log('Line60: ' + documentSnapShot.exists)
            if (documentSnapShot.exists) {
              console.log("Cashier Ref: " + documentSnapShot.data().cashierRef)
              this.isVoucherValid = true
              return documentSnapShot.data().cashierRef != null
              // if (documentSnapShot.data().cashierRef != null) {
              //   this.isVoucherValid = false
              // }
            }
          })
    },
    async redeemVoucher() {
        console.log("redeeming voucher.")
        console.log("is voucher valid: " + this.isVoucherValid)
        console.log("is it our application qr code: ", this.isApplicationVoucher)

        if (this.isVoucherValid && this.isApplicationVoucher) {
          console.log("=======Vocher is valid=========")
          db.collection('userVoucher').doc(this.result).update({redeemedAt: new Date(), cashierRef: db.doc("cashier/natalie@gmail.com")})
          this.$router.push(`CashierRedeemSuccess/${this.result}`)
        } else {
          // alert("Voucher Code is invalid/has been redeemed.")
          await this.presentAlert()
        }
    },
    retrieveUniqueVoucherDetails() {
      console.log("CashierScanPage retrieveUniqueVoucherDetails Called. Amen.")
      console.log("Voucher Id: " + this.result)
      db.collection('userVoucher')
        .doc(this.result)
        .get()
        .then(documentSnapshot => {
          console.log(documentSnapshot.exists)
          if (documentSnapshot.exists) {
            console.log(documentSnapshot.data())
            this.createdAt = documentSnapshot.data().createdAt
            this.paymentType = documentSnapshot.data().paymentType
            this.userref = documentSnapshot.data().userRef
            this.voucherTypeRef = documentSnapshot.data().voucherTypeRef
          }
        })
      
    },
    async onInit (promise) {
      try {
        await promise
      } catch (e) {
        console.error(e)
      } finally {
        this.showScanConfirmation = this.camera === "off"
      }
    },
    async onDecode (content) {
      this.result = content

      this.pause()
      await this.timeout(500)
      this.unpause()
      this.retrieveUniqueVoucherDetails()
      this.redeemVoucher()
      
    },

    unpause () {
      this.camera = 'auto'
    },

    pause () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }, //end qr scanner methods
    async presentAlert() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Invalid QR Code',
          subHeader: 'This is an invalid QR-Code. It could be already redeemed.',
          message: 'Invalid QR Code.',
          buttons: ['OK'],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }

    

  }, 


}
</script>