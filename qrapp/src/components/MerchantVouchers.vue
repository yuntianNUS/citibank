<template>
  <div>
    
    <div id = "container">
        <p id = "title">Merchants</p>
        <input class = 'input' type="text" v-model="search" placeholder="Search voucher"/>

          <div class= 'random' v-for="item in filteredList" :key="item.id">   
              <router-link class="link" :to="'/tabs/merchantVoucherDetail/'+item.id">{{item.data().name}}</router-link>
              <img class="image" :src="item.data().image">
          </div>

    </div>
    
  </div>
  
</template>

<script lang="js">

import {db} from '../main';
import { defineComponent } from '@vue/runtime-core';
// import { IonItem } from '@ionic/vue';

export default defineComponent({
  components: { },
  methods: {
    fetchItems: function () {
      db
        .collection("merchant")
        .get()
        .then((querySnapShot) => {
         
          querySnapShot.forEach((doc) => {
            doc.data().voucherTypes.forEach((voucher) => {
              voucher.get().then((snapshot) => { //snapshot: vouchertype
                if (snapshot.data().count!=0 && this.merchantList.includes(doc) == false){
                  this.merchantList.push(doc)

                }
              })
            })

          })
        })
    }
  },
    data() {
      return{
          merchantList:[],
          search:""
    
      }
    },
    computed: {
    filteredList() {
      return this.merchantList.filter((post) => {
         if(post.data().name.toLowerCase().includes(this.search.toLowerCase())){
           return true
         }
      })
    }
  },
    mounted() {
        this.fetchItems()
    }
})
</script>

<style scoped>
.input{
  height: 40px;
  width: 100%;
  box-shadow: 5px 5px 5px rgb(169, 168, 168);
  border-radius: 10px;
  border-width:1px;

}
#title{
    color: #020358;
    font-size: 20px;
    font-weight: bold;
}
#container{
    padding-left: 5%;
    padding-right:5%;
    
}
.scroll{

    white-space:nowrap;
    overflow-x:scroll;
}

.box{
    width:200px;
    height:150px;
    margin:10px;
    display:inline-block;
    border-color: grey;
    border-style:solid;
    border-radius:15px;
    border-width: 1px;
    background-color:#F5F6F7;
    
}

.image{
  border-radius:15px;
}
.text{
  color: #020358;
  margin-top:-2%;
  
}
.name{
  color: #020358;
}
.link{
  color: #020358;
  text-transform:capitalize;
  /* padding-left:35%; */
  text-decoration: none;
  font-size:15px;
  font-weight:bold;
}
.random{
  margin-top:5%;
}

</style>