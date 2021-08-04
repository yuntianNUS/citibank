<template>
<div>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Test Buy</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>        
          <ion-title size="large">Test Buy</ion-title>
          <router-link style="text-decoration: none; color: inherit;" to="cart" exact>
            <ion-subtitle class="material-icons" slot="end">
              shopping_cart
            </ion-subtitle>
          </router-link>
          <ion-badge id="notifications-badge" slot="end" @add-cart-clicked='updateCart'>{{userCartCount}}</ion-badge>
        </ion-toolbar>
      </ion-header>
    
      <TestBuyContent name="Test Buy Page"/>
    </ion-content>
  </ion-page>
  </div>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import TestBuyContent from '../components/TestBuyContent.vue';
import { db } from "@/main";

export default  {
  name: 'testBuy',
  components: { TestBuyContent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage},
  data() {
    return {
      userCartCount: null,
    }
  },
  methods: {
    fetchItems: function () {
      db.collection('user')
      .doc('4AGK7K5pWEtTSidHcpL3')
      .get().then(snapshot => {
        if (snapshot.exists) {
          this.userCartCount = snapshot.data().cart.length
        }
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
  float: right;
  bottom: 2px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 30px;
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
</style>