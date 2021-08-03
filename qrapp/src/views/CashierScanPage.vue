<template>
  <firebase></firebase>
  <db></db>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { QrcodeStream} from 'vue3-qrcode-reader'
import { db } from "@/main";
import firebase from "firebase";
import router from "../router"

export default  {
  name: 'CashierScan',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, QrcodeStream, db, firebase},
  data(){
    return{
      userVoucherPresentedId: "None",
      camera: 'auto',
      result: null,
      showScanConfirmation: false,
      createdAt: null,
      paymentType: null,
      userRef: null,
      voucherTypeRef: null
    }
  }, 

  methods: {
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

        db.collection('userVoucher')
          .doc(this.result)
          .update({newCashierRef: "YunTian"}) //yuntian to be set dynamically!
      
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
      router.push({name: 'CashierRedeemSuccess'})
      
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

    

  }, 


}
</script>