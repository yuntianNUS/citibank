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
      <MerchantVoucherDetail :voucherListProp="this.voucherList" :merchantProp="this.merchant"></MerchantVoucherDetail>
    </ion-content>
    
  </ion-page>

</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MerchantVoucherDetail from '../components/MerchantVoucherDetail.vue';
import {db} from '../main';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'Tab2',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, MerchantVoucherDetail},
  data() {
    return{
      merchantName: "",
      merchantId: this.$route.params.id,
      voucherList: [] as any,
      merchant:{}
    }
  },
  methods: {
    fetchItems: function () {
      db
        .collection("merchant")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
              if(doc.id == this.merchantId){
                doc.data().voucherTypes.forEach((voucher: any) => { //for each voucher type
                    voucher.get().then((snapshot: any) => { //snapshot: voucher type data
                        if (snapshot.data().count!=0){
                            this.merchantName = doc.data().name
                            this.voucherList.push(snapshot)
                            this.merchant = doc.data()
                            console.log('MERCHANT')
                            console.log(this.merchant)
                        }
                        
                    })
                    console.log(this.voucherList)
                })
              }

          })
        })

  }
  },
  mounted(){
    this.fetchItems()
  }
})
</script>
