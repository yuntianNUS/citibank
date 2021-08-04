<template>
<div>
  <ion-header>
    <ion-toolbar>
      <ion-title>Share</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <p id='socialtext'>Share this voucher with your friends! Type a message below and select a social platform to get started. </p><br/>
    <!-- Add icon library -->
    <input class = 'input' id = 'msg' type="text" v-model="search" placeholder="Type your message here..."/><br/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Add font awesome icons -->
    
    <a class="fa fa-facebook-square fa-3x" @click="presentAlert"></a>
    <a  class="fa fa-twitter-square fa-3x" @click="presentAlert"></a>
    <a class="fa fa-google-plus-square fa-3x" @click="presentAlert"></a>
    <a class="fa fa-linkedin-square fa-3x" @click="presentAlert"></a>
    <a class="fa fa-envelope-square fa-3x" @click="presentAlert"></a>
    <a class="fa fa-snapchat-square fa-3x" @click="presentAlert"></a>
    <a  class="fa fa-telegram fa-3x" @click="presentAlert"></a>
    <a class="fa fa-whatsapp fa-3x" @click="presentAlert"></a>
    <a class="fa fa-instagram fa-3x" @click="presentAlert"></a>
    <a class="fa fa-pinterest-square fa-3x" @click="presentAlert"></a>

    <button  id= "modal" @click="closeModal">Close</button>
  </ion-content>
  </div>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  modalController,
  alertController
} from "@ionic/vue";
import { defineComponent } from "vue";


export default defineComponent({
  name: "Modal",
  components: { IonContent, IonHeader, IonTitle, IonToolbar},
  setup() {
    const closeModal = () => {
      modalController.dismiss();
    };

    return { closeModal };
  },
  methods: {
    presentAlert() {
      this.search =""
      return alertController
        .create({
          header: 'Success',
          message: 'This voucher has been shared successfully.',
          buttons: ['OK'],
        })
        .then(a => a.present())
    }
  },
  data(){
    return{
      search:""
    }
  }
});
</script>
<style>
/* Style all font awesome icons */
.fa {
  padding: 20px;
  font-size: 30px;
  width: 50px;
  text-align: center;
  text-decoration: none;
}

/* Add a hover effect if you want */
.fa:hover {
  opacity: 0.7;
}

/* Set a specific color for each brand */

/* Facebook */
.fa-facebook-square {
  /* background: #3B5998; */
  color: #3B5998;
  margin-left:2%;
  /* border-radius:50%; */

}

/* Twitter */
.fa-twitter-square {
  color: #55ACEE;
  margin-left:5%;


}
.fa-google-plus-square {
  color: #8a0f0f;
  margin-left:5%;

}

.fa-instagram {
  color: #c32aa3;
  margin-left:5%;


}
.fa-whatsapp {
  color: #25D366;
  margin-left:5%;


}
.fa-telegram {
  color: #0088CC;
  margin-left:5%;


}
.fa-envelope-square {
  color: #d0ba16;
  margin-left:5%;


}
.fa-linkedin-square {
  color: #0077B5;
  margin-left:5%;


}
.fa-snapchat-square {
  margin-left:2%;


}
.fa-pinterest-square {
  margin-left:5%;
  color:#c8232c;


}
#modal{
  background-color: white;
  border-radius:15px;
  width:90%;
  margin-left:5%;
  height:30px;
  border: 2px solid #020358;
  color: #020358;
  font-size:15px;
  font-weight:bold;

}
#socialtext{
  text-align: center;
  padding-left:5%;
  padding-right:5%;
  font-weight:bold;
}
#msg{
  width:90%;
  height:200px;
  margin-left:5%;
  margin-right:5%;
  border: 1px solid #020358;
  border-radius:15px;

}


</style>