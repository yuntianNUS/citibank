<template>
<div>
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


          <router-link style="text-decoration: none; color: inherit;" :to="'/tabs/cart'" exact>
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

</div>
</template>

<script>
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
      voucherList: [],
      merchant:{},
      backroute:this.$router,
      userCartCount: null,
    }
  },
  methods: {
    fetchItems: function () {
      db.collection("merchant")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
              if(doc.id == this.merchantId){
                doc.data().voucherTypes.forEach((voucher) => { //for each voucher type
                    voucher.get().then((snapshot) => { //snapshot: voucher type data
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
    
    // User Cart's fetch items
    db.collection('user')
      .doc('4AGK7K5pWEtTSidHcpL3')
      .get().then(snapshot => {
        if (snapshot.exists) {
          this.userCartCount = snapshot.data().cart.length
        }
      })
  },
back:function(){
      this.backroute.go(-1);
  }
},
  created(){
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
  right: 35px
}

ion-badge {
  position: absolute;
  right: 20px;
  bottom: 23px;
  font-size: 0.85rem;
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


