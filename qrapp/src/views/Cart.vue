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
            <ion-label>{{item.title}}</ion-label>
            <ion-label>{{item.quantity}}</ion-label>
          </ion-item>
        </ion-list>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import { db } from "@/main";

export default  {
  name: 'Cart',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage},
  data() {
    return {
      cartList: [],
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
                const title = snapshot.data().name
                const dollar = snapshot.data().costDollar
                const points = snapshot.data().costPoints
                if (refList.includes(refId)) {
                  const i = refList.findIndex(function(e) {return e == refId})
                  this.cartList[i] = {
                    title: title,
                    dollar: dollar,
                    points: points,
                    quantity: (this.cartList[i].quantity +1)
                  }
                } else {
                  this.cartList.push({
                    title: title,
                    dollar: dollar,
                    points: points,
                    quantity: 1
                  })
                  refList.push(refId)
                  console.log(refList)
                }
              }
            })
          })

          console.log('$$$')
          console.log(this.cartList)
          console.log('$$$')
        }
      })
    }
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
</style>