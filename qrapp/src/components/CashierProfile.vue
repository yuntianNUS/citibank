<template>
  <div>
    <img class='img' :src="image">
    <p class= 'name'>{{name}}</p>

    <div id = "container">
    &nbsp;&nbsp;
    <p class="text2">Profile Information </p>
    <p class="text3"> <img id = 'icon' src='../assets/user.png'>  &nbsp; &nbsp; {{name}}</p> 
    <p class="text3"> <img id = 'icon' src='../assets/email.png'> &nbsp; &nbsp; {{email}}</p> 
    </div>
   

  </div>
  
</template>

<script lang="js">
import { defineComponent } from '@vue/runtime-core';
import {db} from '../main';
// import { IonItem } from '@ionic/vue';

export default defineComponent({
name:'Profile',
  methods: {
      fetchItems: function() {
          db
          .collection("cashier")
          .get()
          .then(querySnapShot => {
              querySnapShot.forEach((doc) => {
                  if (doc.data().name == 'Natalie'){
                      this.name = doc.data().name
                      this.email = doc.data().email
                      this.image = doc.data().image
                      console.log(doc.data().email)

                  }
              })
          })
      }
  },
  computed: {
  },
    data() {
      return{
          name: "",
          points: "",
          dollar:"",
          email:"",
          image:""
    
      }
    },
    mounted(){
        this.fetchItems()
    }
})
</script>

<style scoped>
#icon{
    height: 25px;
    width: 25px;
}
#container{
    position:relative;
    padding-left:5%;
}

.float-container {
    border: 3px solid #fff;
    padding-left: 5%;
    padding-top:5%;
}

.green{
  background-color:#020358;
}
.blue{
  background-color:#355B97;
}

.float-child {
   text-align:center;
    width: 45%;
    margin-right:5%;
    float: left;
    padding: 5px;
    border-radius: 10px;
    color:white;
    /* background-color: black; */
}  

.text{
  font-size: 30px;
  font-weight:bold;
}
.smalltext{
  margin-top:-20%;
}
.img{
    border-radius:50%;
    height:35%;
    width:35%;
    margin-left:35%;
    margin-top:5%;
    margin-bottom:-5%;
}
.name{
    text-transform:uppercase;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom:-3%;
}
.text2{
    color: #020358;
    font-size: 20px;
    font-weight: bold;
}
.text3{
    color: #130F26;
}
</style>