<template>
  <div>
    
    <div id = "container">
        <p id = "title">Your Vouchers</p>
        <input class = 'input' type="text" v-model="search" placeholder="Search voucher"/>
          <div class="scroll">
          
          <div class = "box" v-for="item in filteredList" :key="item[0].id">   
              <p class = "expire"> {{item[3]}} </p>
              <img class="image" :src="item[1].data().image">
              <p class="text">
              <router-link class ="link" :to="'/tabs/purchasedVoucherDetail/' + item[0].id">
              {{item[1].data().name}}<br>
              </router-link>
              </p>
              <p class="name"> {{item[2].data().name}}</p>

              
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

                      const soon = new Date()
                      soon.setDate(soon.getDate()+7)
                      if(date <= soon){
                          this.voucherList.push([doc, snapshot2, snapshot3,"EXPIRING",date])
                      }
                      else{
                        
                        this.voucherList.push([doc, snapshot2, snapshot3,"",date])
                      }
                      
                      console.log('FETCH ITEMS')
                    }
                  })
                })
                // console.log('FETCH ITEMS')
                console.log(this.voucherList)
                // this.voucherList = this.sortList(this.voucherList)
              }
              this.sortedList = this.sortList(this.voucherList)
            })
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
    },
    sortList: function(list){
      console.log('SORT')
      this.sortedList= list.sort(function(a,b){return a[4]<b[4];});
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
          value: null,
          sortedList:[]
    
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
    position:relative;
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
.expire{
  position:absolute;
  background-color: red;
  color:white;
  font-weight:bold;
  border-radius:15px;
  width:45%;
  text-align: center;
  margin-left: 5%;
}

</style>