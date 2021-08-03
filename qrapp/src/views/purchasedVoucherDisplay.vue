<template>
  <ion-page> 
   
    <ion-header>
      <ion-toolbar>
        <ion-title>{{merchantName}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <div class='ion-page'>
          <ion-title size="medium">{{merchantName}}</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
      <purchasedVoucherDetail :voucherValueProp="this.voucherValue" :costProp="this.cost" :termsAddDetailsProp="this.termsAddDetails" :termsStackableProp="this.termsStackable" :validityDaysProp="this.validityDays" :validityItemsProp="this.validityItems" :validityOutletsProp="this.validityOutlets" :costDollarProp="this.costDollar" :costPointsProp="this.costPoints" :expiresOnProp="this.expiresOn"></purchasedVoucherDetail>
    </ion-content>
    
  </ion-page>

</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import purchasedVoucherDetail from '../components/purchasedVoucherDetail.vue';
import {db} from '../main';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'Tab2',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, purchasedVoucherDetail},
  data() {
    return{
      merchantName: "",
      voucherId: this.$route.params.id,
      voucherList: [] as any,
      voucherValue : 0,
      costPoints : 0,
      costDollar: 0,
      termsAddDetails : "",
      termsStackable: "",
      validityDays: 0,
      validityItems:"",
      validityOutlets:[] as any,
      expiresOn: {}
    }
  },
  methods: {
    fetchItems: function () {
      db
        .collection("userVoucher")
        .get()
        .then((querySnapShot) => {
         
          querySnapShot.forEach((doc) => {
            if(doc.id == this.voucherId){
              doc.data().voucherTypeRef.get().then((snapshot2: any) =>{//snapshot2:voucher type data
                snapshot2.data().merchant.get().then((snapshot: any) => { //snapshot: merchant data
                  this.merchantName = snapshot.data().name
                  this.voucherValue = snapshot2.data().value
                  this.costPoints = snapshot2.data().costPoints
                  this.costDollar = snapshot2.data().costDollar
                  this.termsAddDetails = snapshot2.data().terms.additionalDetails
                  if (snapshot2.data().terms.stackablePromotion == true){
                    this.termsStackable = 'This voucher can be used in conjunction with other promotions.'
                  }
                  if (snapshot2.data().terms.stackablePromotion == false){
                    this.termsStackable = 'This voucher cannot be used in conjunction with other promotions.'
                  }
                  
                  this.validityDays = snapshot2.data().terms.validityDays
                  this.validityItems = snapshot2.data().terms.validityItems
                  this.validityOutlets = snapshot2.data().terms.validityOutlets
                  const date = doc.data().createdAt.toDate()
                  date.setDate(date.getDate() + this.validityDays)
                  this.expiresOn = this.formatDate(date)
                  console.log(date)
                
              })

              })

            }
          })
        })

  },
  formatDate: function(date: any) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) {
          month = '0' + month;
      }
      if (day.length < 2) {
          day = '0' + day;
      }

      return [year, month, day].join('-');
    }
  },
  mounted(){
    this.fetchItems()
  }
})
</script>
