<template>
  <ion-button @click="presentFailedAlert">Show Alert</ion-button>
  <ion-button @click="presentPassAlert">Show Alert</ion-button>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Scan Voucher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Scan Voucher</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- <p class="decode-result">
        The QR Code Id is: <b>{{ result }}</b>
      </p> -->

      <div class="w-3/4 h-full m-auto" id="camera">
        <qrcode-stream
          :camera="camera"
          @decode="onDecode"
          @init="onInit"
        ></qrcode-stream>
      </div>
      <img src="../assets/sample-qrcode.png" />
      <p>Align QR Code to fit the frame</p>
      <!-- <p>The Voucher ID is:{{ userVoucherPresentedId }}</p> -->
    </ion-content>
  </ion-page>
</template>

<script lang="js">

import { alertController } from '@ionic/vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { QrcodeStream} from 'vue3-qrcode-reader'
import { db } from "@/main";
// import firebase from "firebase";
// import router from "../router"

export default  {
  name: 'CashierScan',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, QrcodeStream},
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
      isApplicationVoucher: null,
      isVoucherRedeemable: null,
      failImgUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoppng.com%2Fwrong-cross-symbol-PNG-free-PNG-Images_183175&psig=AOvVaw1rTvSBDyWZQyIitumY7sMb&ust=1628196964102000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLD8mb-gmPICFQAAAAAdAAAAABAD"
    }
  }, 

  methods: {
    async checkIsAppVoucher() {
      console.log("CheckIsAppVoucherCalled")
      await db.collection('userVoucher')
        .doc(this.result)
        .get()
        .then(doc => {
          this.isApplicationVoucher = doc.exists
          // console.log("Voucher Exists?: ", doc.exists)
          console.log(this.isApplicationVoucher)
          return doc.exists
        })
    },
    async checkHasVoucherBeenRedeemed() {
      console.log("CheckHasRedeemedCalled")
      await db.collection('userVoucher')
          .doc(this.result)
          .get()
          .then(documentSnapShot => {
            if (documentSnapShot.exists) {
              (documentSnapShot.data().cashierRef == null) ? this.isVoucherRedeemable = true : this.isVoucherRedeemable = false
              console.log("isVoucherRedeemable",this.isVoucherRedeemable)
              console.log("VoucherRef is null?:",documentSnapShot.data().cashierRef == null)
              return documentSnapShot.data().cashierRef != null
            }
          })
    },
    async redeemVoucher() {
      console.log("redeeming voucher() called")
      await db.collection('userVoucher')
        .doc(this.result)
        .update({
          redeemedAt: new Date(), 
          cashierRef: db.doc("cashier/natalie@gmail.com")
        })
    },
    retrieveUniqueVoucherDetails() {
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
    async onDecode (content) { //pseudo main()
      this.result = content
      console.log("In onDecode")
      console.log(content)
      this.pause()
      await this.timeout(500)
      this.unpause()

      await this.checkIsAppVoucher()

      if (this.isApplicationVoucher) {
        await this.checkHasVoucherBeenRedeemed()
      }
      
      console.log("++++++++++++++++++++")
      console.log("isApplicationVoucher", this.isApplicationVoucher)
      console.log("isVoucherRedeemable?", this.isVoucherRedeemable)
      console.log("++++++++++++++++++++")

      if (this.isApplicationVoucher && this.isVoucherRedeemable) {
        await this.redeemVoucher()
        await this.presentPassAlert()
      } else {
        await this.presentFailedAlert()
      }
      
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
    async presentFailedAlert() {
      console.log("Present Failed Called")
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Invalid QR Code',
          subHeader: 'This is an invalid QR-Code. It could be already redeemed.',
          message: `<img src="https://toppng.com/uploads/preview/wrong-cross-symbol-11562969015bvubqupjq3.png" alt="g-maps" style="border-radius: 2px">`,
          buttons: ['OK'],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },
    async presentPassAlert() {
      console.log("Present PASS Called")
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Success',
          subHeader: '',
          message: `<img src="https://icon2.cleanpng.com/20180404/gdq/kisspng-check-mark-computer-icons-clip-art-green-tick-5ac5328d7fdf55.2729449315228729735238.jpg" alt="g-maps" style="border-radius: 2px">`,
          buttons: ['OK'],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  }, 
}
</script>

<style scoped>
ion-title {
  text-align: center;
}
#camera {
  height: 75vw;
  width: 75vw;
  position: absolute;
  top: 20vh;
  left: 12.5vw;
}
p {
  text-align: center;
}
img {
  height: 70vw;
  width: 70vw;
  position: absolute;
  top: 21.5vh;
  left: 15vw;
  opacity: 0.8;
}
</style>