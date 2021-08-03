<template>
  <div>
    
    <div id = "container">
        <p id = "title">Your Vouchers</p>
        <input class = 'input' type="text" v-model="search" placeholder="Search voucher"/>
          <div class="scroll">
          
          <div class = "box" v-for="item in filteredList" :key="item[0].id">   
              <img class="image" :src="item[1].data().image">
              <p class="text">
              <router-link class ="link" :to="'/tabs/purchasedVoucherDetail/' + item[0].id">
              {{item[1].data().name}}<br>
              </router-link>
              </p>
              <p class="name"> {{item[2].data().name}} </p>
              
          </div>
     
          </div> 

    </div>

  </div>
  
</template>

<script lang="js">
import {db} from '../main';
import { defineComponent } from '@vue/runtime-core';

// import { IonItem } from '@ionic/vue';

export default defineComponent({
  methods: {
    fetchItems: function () {
      db
        .collection("userVoucher")
        .get()
        .then((querySnapShot) => {
         
          querySnapShot.forEach((doc) => {
            
            doc.data().userRef.get().then((snapshot) => { //snapshot: get user data
              if(snapshot.data().name == "Sabrina" && doc.data().cashierRef == undefined) {
                console.log(snapshot.data())
                doc.data().voucherTypeRef.get().then((snapshot2) => { //snapshot2: get voucher data
                  snapshot2.data().merchant.get().then((snapshot3) => {//snapshot3: get merchant data
                    const date = doc.data().createdAt.toDate()
                    date.setDate(date.getDate()+snapshot2.data().terms.validityDays)
                    if(date > new Date()){
                      this.voucherList.push([doc, snapshot2, snapshot3])
                    }
                    console.log(this.voucherList)
                  })
                })
              }
            })
          })
        })
    }
  },
  computed: {
    filteredList() {
      return this.voucherList.filter((post) => {

         if(post[1].data().name.toLowerCase().includes(this.search.toLowerCase()) || post[2].data().name.toLowerCase().includes(this.search.toLowerCase())){
           return true
         }
      })
    }
  },
    data() {
      return{
          voucherList:[],
          search:"",
          value: null
    
      }
    },
    mounted() {
        this.fetchItems()
    }
})
</script>

<style scoped>
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
  height:120px;
  width:200px;
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
  padding-left:35%;
  text-decoration: none;
  font-size:20px;
  font-weight:bold;
}
.input{
  height: 40px;
  width: 100%;
  box-shadow: 5px 5px 5px rgb(169, 168, 168);
  border-radius: 10px;
  border-width:1px;

}

</style>