<template>
<div>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Redeemed</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>        

            <ion-subtitle class="material-icons" slot="start" v-on:click='back()'>
              arrow_back_ios
            </ion-subtitle>

          <ion-title size="large">Redeemed</ion-title>
        </ion-toolbar>
        <ion-list>
          <ion-item v-for="(item, index) in redeemedList" :key="index">
            <!-- <ion-thumbnail slot="start">
              <img class="image" :src="item.img">
            </ion-thumbnail> -->
            <ion-label>
              <h2>{{item.voucherTypeId}}</h2>
              <p>${{item.redeemDate}}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-header>
    </ion-content>
  </ion-page>
  </div>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import { db } from "@/main";

export default  {
  name: 'Cart',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage},
  data() {
    return {
      backroute: this.$router,
      redeemedList: []
    }
  },
  methods: {
    back:function(){
      this.backroute.go(-1);
  },
    fetchItems: function() {
      console.log('fetching')
      db.collection('userVoucher').get()
        .then((querySnapShot) => {
         querySnapShot.forEach((doc) => {
           console.log('here')
           if (doc.data().cashierRef) {
            const cashierId = doc.data().cashierRef.id
            if (cashierId == 'natalie@gmail.com') {
              const redeemDate = doc.data().redeemedAt
              const voucherTypeId = doc.data().voucherTypeRef.id
              this.redeemedList.push((voucherTypeId, redeemDate))
            }
           }
         })
      })
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
  text-align: center;
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
#increase {
  font-size: 20px;
  position: relative;
  left:-20px;
  bottom: -2px
}
#decrease {
  font-size: 20px;
  position: relative;
  left:-120px;
  bottom: -2px
}
ul,li {
  list-style: none;
  position: relative;
  margin: 0;
}
li {
  float:left
}
h3 {
  width: 10px;
  float:left;
  position: relative;
  left: -13px;
  bottom: -1px;
  font-size: 20px;
  font-weight: bold;
}
button {
  background: none;
}
</style>