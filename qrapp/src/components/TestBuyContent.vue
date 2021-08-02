<template>
  <div id="container">
    <strong>{{ name }}</strong><br>
    <ion-button>Buy Now</ion-button>
  </div>
</template>

<script>
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { db } from "@/main";

export default defineComponent({
  name: 'TestBuyContent',
  props: {
    name: String
  },
  components: { IonButton },
  
  methods: {
    fetchItems: function () {
      console.log('method called')
      db.collection('user')
        .doc('4AGK7K5pWEtTSidHcpL3')
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            console.log(documentSnapshot.data().name)
          }
        })
    },
  },

  created() {
    this.fetchItems();
  },

});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>