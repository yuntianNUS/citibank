<template>
  <div>
    <div id = "container">
        <div class= "top-container" v-if="!codeDisplay">
        <img class="image" :src="imageProp" v-if="!codeDisplay">
        <p class="text"> Voucher Value </p>
        <p class= "value"> ${{voucherValueProp}}</p>
        <p class= "points" v-if="!codeDisplay">{{costPointsProp}} points OR ${{costDollarProp}}</p>
        </div>
        <div class="terms" v-if="!codeDisplay">
            <div class="bottom-container">
        <p class="text"> Terms of Use</p>
        <p> <img id = 'icon' src='../assets/add.jpeg'>  {{termsAddDetailsProp}}</p> 
        <p> <img id = 'icon' src='../assets/stackable.png'>  {{termsStackableProp}}</p> 
        <p> <img id = 'icon' src='../assets/calendar.jpeg'>  This voucher is valid for {{validityDaysProp}} days. Expiring on {{expiresOnProp}}.</p> 
        <p> <img id = 'icon' src='../assets/menuitems.png'>  This voucher is valid for the following items: {{validityItemsProp}}</p> 
        <p> <img id = 'icon' src='../assets/location.png'> {{validityOutletsProp}}</p> 
        </div>
        </div>
        <ion-card v-if="codeDisplay">
            <ion-card-header>
              <ion-item>
                <ion-icon
                  name="close-sharp"
                  slot="end"
                  @click="closeCode"
                ></ion-icon>
              </ion-item>
              <ion-card-title>Voucher</ion-card-title>
            </ion-card-header>
            <qrcode-vue :value="userVoucherId" :size="200" level="H" />
            <ion-card-content>
              Show this QR Code to <br />
              the staff at the counter. <br />
              <br />
            </ion-card-content>
          </ion-card>
        <div class = "button">
        <button @click="showQr" v-if="!codeDisplay"> Use Now </button>
        </div>

    </div> 
  </div>
  
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import QrcodeVue from "qrcode.vue";

export default defineComponent({
  components: {QrcodeVue},
  data() {
      return {
          codeDisplay: false,
          userVoucherId: "",
      }
  },
  props: {
        voucherValueProp: {},
        costPointsProp: {},
        costDollarProp: {},
        termsAddDetailsProp:{},
        termsStackableProp:{},
        validityDaysProp: {},
        validityItemsProp: {},
        validityOutletsProp:{},
        expiresOnProp:{},
        imageProp:{}
    },
    methods: {
        showQr: function() {
            this.codeDisplay = true
            this.userVoucherId = this.$route.params.id
        },
        closeCode: function () {
            this.codeDisplay = false;
        },
    }
})
</script>

<style scoped>
#container{
    /* background-color:#f0f0f0; */
}
#title{
    color: #020358;
    font-size: 20px;
    font-weight: bold;
}
.top-container{
    padding-top:5%;
    padding-left: 5%;
    padding-right:5%;
}
.bottom-container{
    padding-top:2%;
    padding-left: 5%;
    padding-right:5%;
}
.image{
    border-radius: 15px;
    width: 400px;
}
.text{
    color: #020358;
    font-size: 20px;
    font-weight: bold;
}
.value{
    background-color:white;
    box-shadow: 3px 4px 5px rgb(186, 186, 186);
    color: #020358;
    border-radius:10px;
    height:40px;
    font-size:20px;
    font-weight:bold;
    color:#355B97;
    text-align:center;
    padding-top:2%;

}
.points{
    color: #020358;
    font-size: 15px;
    font-weight: bold;
}

.terms{
    background-color: white;
    border-radius:15px;
    width:100%;
    height:100%;
}
#icon{
    height: 25px;
    width: 25px;
}
button{
    background-color:#020358;
    color:white;
    font-weight: bold;
    text-align: center;
    width: 100%;
    height: 40px;
    border-radius: 10px;
}
.button{
    padding-left:5%;
    padding-right:5%;
    padding-bottom:5%;
}
ion-card {
  height: auto;
  text-align: center;
}

</style>