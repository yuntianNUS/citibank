<template>
  <div>
    <div id="container" v-if="!codeDisplay && !errorDisplay">
      <div class="top-container">
        <img class="image" :src="merchantProp.image" />

        <p class="text">Voucher Value</p>
        <div class="scroll">
          <div class="box" v-for="item in voucherListProp" :key="item.id">
            <button
              class="value"
              v-on:click="display(item)"
              :key="item.id"
              :ref="item.id"
            >
              {{ item.data().value }}
            </button>
          </div>
        </div>
        <p class="points">{{ costPoints }} {{ costDollar }}</p>
      </div>

      <div v-if="clicked==true" class="terms">
        <div class="bottom-container">
          <p class="text">Terms of Use</p>
          <p>
            <img id="icon" src="../assets/add.jpeg" /> {{ termsAddDetails }}
          </p>
          <p>
            <img id="icon" src="../assets/stackable.png" /> {{ termsStackable }}
          </p>
          <p>
            <img id="icon" src="../assets/calendar.jpeg" /> {{ validityDays }}
          </p>
          <p>
            <img id="icon" src="../assets/menuitems.png" /> {{ validityItems }}
          </p>
          <p>
            <img id="icon" src="../assets/location.png" /> {{ validityOutlets }}
          </p>
        </div>
      </div>
    </div>

    
        <div id="container">

          <div class = "footer">
          <ul v-if="!codeDisplay && !errorDisplay">
            <button @click="addCartNum -= 1" :disabled="addCartNum == 0">
              <li class="material-icons" id="decrease">remove_circle</li>
            </button>
            <li>
              <h3 id="cart-num">{{ addCartNum }}</h3>
            </li>
            <li
              class="material-icons"
              id="increase"
              v-on:click="addCartNum += 1"
            >
              add_circle
            </li>
          </ul>
          <br />
          
          <ion-button
            id="cartButton"
            v-if="!codeDisplay && !errorDisplay"
            @click="toCart"
            :disabled="(storage == null) || (addCartNum <= 0)"
            >Add to Cart</ion-button
          >
          <ion-button id="buyButton"
            v-if="!codeDisplay && !errorDisplay"
            @click="alertBuyMethod"
            :disabled="storage == null"
            >Buy Now</ion-button
          >
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
           <a id = "share" class="fa fa-share fa-2x" v-if="!codeDisplay && !errorDisplay" @click="openModal"></a>
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
              <ion-card-title>{{ voucherName }}</ion-card-title>
              <ion-card-subtitle
                ><br />Valid {{ voucherValidityDays }} days</ion-card-subtitle
              >
            </ion-card-header>
            <qrcode-vue :value="userVoucherId" :size="200" level="H" />
            <ion-card-content>
              Show this QR Code to <br />
              the staff at the counter. <br />
              <br />
              Wallet Balance: {{ walletBalanceMsg }}
            </ion-card-content>
          </ion-card>
          <ion-card v-if="errorDisplay">
            <ion-card-header>
              <ion-item>
                <ion-icon
                  name="close-sharp"
                  slot="end"
                  @click="closeError"
                ></ion-icon>
              </ion-item>
            </ion-card-header>
            <ion-card-title><br /><br /><br />{{ errorMsg }}</ion-card-title>
            <ion-card-content>
              {{ errorMsgLong }}
            </ion-card-content>
          </ion-card>
        </div>

  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import modalSharing from "../components/modalSharing.vue";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  alertController,
  modalController,
  IonIcon
} from "@ionic/vue";
import { db } from "@/main";
import { warning } from "ionicons/icons";
import firebase from "firebase";
import QrcodeVue from "qrcode.vue";

export default defineComponent({
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    QrcodeVue,
    IonIcon
  },
  props: {
    voucherListProp: {},
    merchantProp: {},
  },
  setup() {
    const openModal = async () => {
      const modal = await modalController.create({
        component: modalSharing, //Modal is name of the component to render inside ionic modal
      });
      return modal.present();
    };

    return { openModal, warning };
  },
  methods: {
    display: function (item){
        this.clicked = true
        console.log('DISPLAY')
        this.storage = item
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

        this.fetchItems();
    },
    default: function () {
      this.costPoints = "Please select voucher value";
      this.costDollar = "";
      this.termsAddDetails = "Please select voucher value";
      this.termsStackable = "Please select voucher value";
      this.validityDays = "Please select voucher value";
      this.validityItems = "Please select voucher value";
      this.validityOutlets = "Please select voucher value";
    },
    // Purchase's Methods
    fetchItems: function () {
      console.log("fetch items called");
      db.collection("voucherType")
        .doc(this.storage.id) //this.voucherTypeId
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            this.voucherName = documentSnapshot.data().name;
            this.voucherValidityDays =
              documentSnapshot.data().terms.validityDays;
            this.voucherCostDollar = documentSnapshot.data().costDollar;
            this.voucherCostPoints = documentSnapshot.data().costPoints;
            this.voucherCount = documentSnapshot.data().count;
          }
        });
      db.collection("user")
        .doc("sabrina@gmail.com")
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            this.userCartCount = documentSnapshot.data().cart.length;
          }
        });
    },
    toCart: async function () {
      // update user's cart
      const addCartList = [];
      for (let i = 1; i <= this.addCartNum; i++) {
        console.log("ADD");
        const cartItem = {
          voucherTypeRef: db.doc("voucherType/" + this.storage.id), //this.voucherTypeId
          creationDate: new Date(),
          randomNum: Math.random(), // as arrayunion wont addd duplicate entries
        };
        addCartList.push(cartItem);
      }

      console.log(addCartList);

      await db
        .collection("user")
        .doc("sabrina@gmail.com")
        .update({
          cart: firebase.firestore.FieldValue.arrayUnion.apply(
            this,
            addCartList
          ),
        })
        .then(() => {
          this.userCartCount += this.addCartNum;
          this.cartConfirmationAlert();
        });
    },
    cartConfirmationAlert: async function () {
      console.log("Added to cart");
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Added to Cart",
        message: "The voucher(s) have been successfully added to the cart",
        buttons: [
          {
            text: "Ok",
            handler: () => {
              this.$router.go(); //REFRESH PAGE TO UPDATE CART NUMBER. SHOULD CHANGE TO EMIT
            },
          },
        ],
      });
      await alert.present();

      const { role } = await alert.onDidDismiss();
    },
    buyNowDisplay: function (purchaseMethod) {
      // check if wallet has sufficient points & sufficient quantity
      // NOTE: cashier to check if user bought
      console.log("###");
      console.log(purchaseMethod);
      console.log("###");

      console.log("#Wallet#");
      console.log(this.userWallet);
      console.log("#Wallet#");

      console.log("#Voucher Cost#");
      console.log(this.voucherCost);
      console.log("#VoucherCost#");
      if (this.voucherCount <= 0) {
        this.codeDisplay = false;
        this.errorDisplay = true;
        this.errorMsg = "Sold Out";
        this.errorMsgLong =
          "This voucher has been fully purchased! Do check out the other vouchers available instead.";
      } else if (this.userWallet < this.voucherCost) {
        this.codeDisplay = false;
        this.errorDisplay = true;
        this.errorMsg = "Insufficient Wallet Balance";
        if (purchaseMethod == "$") {
          this.errorMsgLong =
            "This voucher costs $" +
            this.voucherCost +
            " but you currently only have $" +
            this.userWallet +
            " stored in your wallet.";
        } else if (purchaseMethod == "points") {
          this.errorMsgLong =
            "This voucher costs " +
            this.voucherCost +
            " points but you currently only have " +
            this.userWallet +
            " points.";
        }
      } else {
        // sufficient points/cash, transaction goes through
        // create userVoucher instance
        this.userVoucherId = db.collection("userVoucher").doc().id;
        db.collection("userVoucher")
          .doc(this.userVoucherId)
          .set({
            createdAt: new Date(),
            userRef: db.doc("user/" + "sabrina@gmail.com"),
            voucherTypeRef: db.doc("voucherType/" + this.storage.id), //this.voucherTypeId
            paymentType: purchaseMethod,
          });

        // update voucherType's count
        db.collection("voucherType")
          .doc(this.storage.id) //this.voucherTypeId
          .update({
            count: firebase.firestore.FieldValue.increment(-1),
          });

        // user: update vouchers and wallet balance
        if (purchaseMethod == "$") {
          db.collection("user")
            .doc("sabrina@gmail.com")
            .update({
              walletBalanceDollar: firebase.firestore.FieldValue.increment(
                -this.voucherCost
              ),
            });
          this.walletBalanceMsg = "$" + (this.userWallet - this.voucherCost);
        } else if (purchaseMethod == "points") {
          db.collection("user")
            .doc("sabrina@gmail.com")
            .update({
              walletBalancePoints: firebase.firestore.FieldValue.increment(
                -this.voucherCost
              ),
            });
          this.walletBalanceMsg =
            this.userWallet - this.voucherCost + " points";
        }
        this.codeDisplay = true;
      }

      console.log("%%% Display");
      console.log(this.codeDisplay);
    },
    closeCode: function () {
      this.codeDisplay = false;
    },
    closeError: function () {
      this.errorDisplay = false;
    },
    async alertBuyMethod() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Purchase Options",
        //subHeader: 'Subtitle',
        //message: 'This is an alert message.',
        buttons: [
          {
            text: "Cash",
            handler: () => {
              console.log("Cash Chosen");
              db.collection("user")
                .doc("sabrina@gmail.com")
                .get()
                .then((documentSnapshot) => {
                  if (documentSnapshot.exists) {
                    this.userWallet =
                      documentSnapshot.data().walletBalanceDollar;
                    this.voucherCost = this.voucherCostDollar;
                    this.buyNowDisplay("$");
                  }
                });
            },
          },
          {
            text: "Points",
            handler: () => {
              console.log("Points Chosen");
              db.collection("user")
                .doc("sabrina@gmail.com")
                .get()
                .then((documentSnapshot) => {
                  if (documentSnapshot.exists) {
                    this.userWallet =
                      documentSnapshot.data().walletBalancePoints;
                    this.voucherCost = this.voucherCostPoints;
                    this.buyNowDisplay("points");
                    console.log("CHECK");
                    console.log(this.userWallet);
                    console.log("CHECK");
                  }
                });
            },
          },
        ],
      });
      return alert.present();
    },
  },
  data() {
    return {
      previous: null,
      costPoints: null,
      costDollar: null,
      termsAddDetails: "",
      termsStackable: "",
      validityDays: null,
      validityItems:"",
      validityOutlets:null,
      route: this.$route.params.id,
      storage: null,

      // Purchase's Data
      codeDisplay: false,
      errorDisplay: false,
      errorMsg: "",
      errorMsgLong: "",
      //voucherTypeId: "IeFsdsKI61bSXrr4106Z", // HARDCODE TO CHANGE
      voucherName: "",
      voucherValidityDays: null,
      voucherCost: null,
      voucherCostDollar: null,
      voucherCostPoints: null,
      voucherCount: null,
      userWallet: null,
      userCartCount: null,
      walletBalanceMsg: "",
      addCartNum: 0,
      clicked:false
    };
  },
  mounted() {
    this.default();
  },
//   created() {
//     this.fetchItems();
//   },
});
</script>

<style scoped>
/* .scroll{
  overflow:auto;
  height:80px;
  padding-bottom: 30%; */
/* } */
#title {
  color: #020358;
  font-size: 20px;
  font-weight: bold;
}
.top-container {
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
}
.bottom-container {
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
}
.image {
  border-radius: 15px;
  width: 400px;
}
.text {
  color: #020358;
  font-size: 20px;
  font-weight: bold;
}
.value {
  background-color: white;
  box-shadow: 3px 4px 5px rgb(186, 186, 186);
  color: #020358;
  border-radius: 10px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #355b97;
  text-align: center;
  padding-top: 2%;
}
.points {
  color: #020358;
  font-size: 15px;
  font-weight: bold;
}

.terms {
  background-color: white;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  overflow:auto;
  padding-bottom:20%;
}
#icon {
  height: 25px;
  width: 25px;
}
.value {
    width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 5%;
}
.scroll {
  white-space: nowrap;
  overflow-x: scroll;
}

.box {
  width: 50%;
  height: 40px;
  margin: 10px;
  display: inline-block;
}

/* footer styling */
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

ion-card {
  height: 60vh;
  text-align: center;
}

#increase {
  font-size: 30px;
  position: relative;
  bottom: -15px;
}

#decrease {
  font-size: 30px;
  position: relative;
  bottom: -15px;
}

ul,
li {
  list-style: none;
  position: relative;
  bottom: -15px;
}

li {
  float: left;
  margin: 0;
}

h3 {
  padding: 0px 10px;
  position: relative;
  bottom: 13px;
  left: -35px;
}

a,button {
  background: none;
  padding: 0;
  float: left;
}


#cartButton {
  position: relative;
  left: -30px;
}
#buyButton {
  position: relative;
  top:-52px;
  left: 170px;
}

ion-card-title {
    text-align: center;
}
#share{
    position:relative;
    left:320px;
    top:-40px;

}
.footer{
  position: fixed;
  top:88%;
}
</style>