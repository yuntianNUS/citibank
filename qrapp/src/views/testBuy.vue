<template>
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
          <ion-subtitle class="material-icons" slot="end">
            shopping_cart
          </ion-subtitle>
          <ion-badge id="notifications-badge" slot="end">{{userCartCount}}</ion-badge>
        </ion-toolbar>
      </ion-header>
    
      <TestBuyContent name="Test Buy Page" @addCartClicked="onClickChild"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
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
    onClickChild: function (value) {
      this.userCartCount = value;
    },
    fetchItems: function () {
      console.log('fetch items called')      
      db.collection('user')
        .doc('4AGK7K5pWEtTSidHcpL3') // HARDCODE TO CHANGE
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            this.userCartCount = documentSnapshot.data().cart.length
            console.log('cart count badge')
            console.log(this.userCartCount)
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
ion-page {
  --background: red
}

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