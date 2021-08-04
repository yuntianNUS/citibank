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
          <ion-title size="medium">Redeemed</ion-title>
        </ion-toolbar>
        <ion-list>
          <ion-item v-for="(item, index) in redeemedList" :key="index">
            <ion-thumbnail slot="start">
              <img class="image" :src="item.img">
            </ion-thumbnail>
            <ion-label>
              <router-link class ="link" :to="'/tabs/redeemedVoucherDetail/' + item.id"><h2>{{item.redeemName}}</h2></router-link>
              
              <p>Redeemed Value: {{item.redeemValueText}}</p>
              <p>Redeemed on: {{item.redeemDate}}</p>
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
           if (doc.data().cashierRef) {
            const cashierId = doc.data().cashierRef.id
            if (cashierId == 'natalie@gmail.com') {
              const redeemDate = this.formatDate(doc.data().redeemedAt.toDate())
              doc.data().voucherTypeRef.get().then((snapshot) => {
                const Id = doc.id
                const redeemValueType = snapshot.data().valueType
                const redeemValue = snapshot.data().value
                const redeemName = snapshot.data().name
                const image = snapshot.data().image
                let redeemValueText = ""
                if (redeemValueType == "$") {
                  redeemValueText = "$" + redeemValue
                } else {
                  redeemValueText = redeemValue + ' %'
                }
                this.redeemedList.push({
                  redeemName: redeemName,
                  redeemValueText: redeemValueText,
                  redeemDate: redeemDate,
                  img: image,
                  id:Id
                })
              })
            }
           }
         })
      })
    },
    formatDate: function(date) {
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
.link{
  color: #020358;
  text-decoration: none;

}
</style>