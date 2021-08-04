<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{merchantName}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-icon  id="back" v-on:click="back()" size="large" name="chevron-back"></ion-icon>        
          <ion-title size="large">{{merchantName}}</ion-title>
          <router-link style="text-decoration: none; color: inherit;" to="cart" exact>
            <ion-subtitle class="material-icons" slot="end">
              shopping_cart
            </ion-subtitle>
          </router-link>
          <ion-badge id="notifications-badge" slot="end" @add-cart-clicked='updateCart'>{{userCartCount}}</ion-badge>
        </ion-toolbar>
      </ion-header>
    
      <MerchantVoucherDetail :voucherListProp="this.voucherList" :merchantProp="this.merchant"></MerchantVoucherDetail>
    </ion-content> 
  </ion-page>


</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/vue';
import MerchantVoucherDetail from '../components/MerchantVoucherDetail.vue';
import {db} from '../main';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'Tab2',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, MerchantVoucherDetail},
  data() {
    return{
      merchantName: "",
      merchantId: this.$route.params.id,
      voucherList: [] as any,
      merchant:{},
      backroute:this.$router
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

  },
back:function(){
      this.backroute.go(-1);
  }
  },
  mounted(){
    this.fetchItems()
  }
})
</script>

<style>
.material-icons {
  float: right;
  bottom: 7px;
  margin-left:50px;
  position: absolute;
  right: 20px
}

ion-badge {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 1rem;
}

ion-title {
  font-size: 25px;
  text-align: center;
  padding-bottom: 10px;
}

ion-footer {
  position: relative;
}
</style>


