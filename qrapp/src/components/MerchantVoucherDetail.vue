<template>
  <div>
    <div id = "container">
        <div class= "top-container">
       
        <img class="image" :src="merchantProp.image">
        
        <p class="text"> Voucher Value </p>
        <div class="scroll">
        <div class = "box" v-for="item in voucherListProp" :key="item.id">
            <button class = "value" v-on:click="display(item)" :key="item.id" :ref="item.id"> {{item.data().value}} </button>
        </div>
        </div>
        <p class= "points">{{costPoints}}  {{costDollar}}</p>
        </div>
        <div class="terms">
            <div class="bottom-container">
        <p class="text"> Terms of Use</p>
        <p> <img id = 'icon' src='../assets/add.jpeg'>  {{termsAddDetails}}</p> 
        <p> <img id = 'icon' src='../assets/stackable.png'>  {{termsStackable}}</p> 
        <p> <img id = 'icon' src='../assets/calendar.jpeg'>  {{validityDays}} </p> 
        <p> <img id = 'icon' src='../assets/menuitems.png'>  {{validityItems}}</p> 
        <p> <img id = 'icon' src='../assets/location.png'> {{validityOutlets}}</p> 
        </div>
        </div>
        <div class = "button">
        <button> Use Now </button>
        <ion-button @click="openModal">Open Modal</ion-button>
        </div>

    </div> 
  </div>
  
</template>

<script lang="js">
import { defineComponent } from '@vue/runtime-core';
// import { routeLocationKey } from 'vue-router';
import {IonButton,modalController} from '@ionic/vue';
import modalSharing from "../components/modalSharing.vue";


export default defineComponent({
  components: {IonButton},
  props: {
    voucherListProp: {},
    merchantProp: {}
},
setup() {
    const openModal = async () => {
      const modal = await modalController.create({
        component: modalSharing, //Modal is name of the component to render inside ionic modal
      });
      return modal.present();
    };

    return { openModal };
  },
methods:{
    display: function (item){
        console.log('DISPLAY')
        this.costPoints = item.data().costPoints + " points OR "
        this.costDollar ="$ " + item.data().costDollar
        this.termsAddDetails = item.data().terms.additionalDetails
        if(item.data().terms.stackablePromotion == true){
            this.termsStackable = 'This voucher can be used in conjunction with other promotions.'
        }
        if(item.data().terms.stackablePromotion == false){
            this.termsStackable = 'This voucher cannot be used in conjunction with other promotions.'
        }
        this.validityDays= "This voucher is valid for " + item.data().terms.validityDays + " days."
        this.validityItems = "This voucher is valid for the following items: " + item.data().terms.validityItems
        this.validityOutlets = "This voucher is applicable to the following outlets: " + item.data().terms.validityOutlets
        
        const x = this.$refs[item.id]
        console.log('x')
        console.log(x)
        if (this.previous != null){
            this.previous.style.backgroundColor = "transparent"
            this.previous.style.color = "#355B97"
        
        }
        x.style.backgroundColor = "#020358"
        x.style.color = "white"
        this.previous = x
    },
    default: function () {
        this.costPoints = "Please select voucher value"
        this.costDollar = ""
        this.termsAddDetails = "Please select voucher value"
        this.termsStackable = "Please select voucher value"
        this.validityDays= "Please select voucher value"
        this.validityItems = "Please select voucher value"
        this.validityOutlets = "Please select voucher value"
        
  }
},
data() {
    return{
      previous: null,
      costPoints: null,
      costDollar: null,
      termsAddDetails: "",
      termsStackable: "",
      validityDays: null,
      validityItems:"",
      validityOutlets:null,
      route: this.$route.params.id
      
    }
},
mounted(){
    this.default()
}

})
</script>

<style scoped>
#container{
    background-color:#f0f0f0;
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
.scroll{

    white-space:nowrap;
    overflow-x:scroll;
}

.box{
    width:50%;
    height:40px;
    margin:10px;
    display:inline-block;
    
}
</style>