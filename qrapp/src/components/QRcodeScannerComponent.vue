<template>
    <p>QR Code Scanner</p>
    <div class="flex h-screen">
        <div class="w-3/4 h-full m-auto">
            <qrcode-stream @decode='decode' :track='drawOutline'></qrcode-stream>
        </div>
    </div>
    <div>
        <p>{{userVoucherId}}</p>
    </div>
</template>

<script lang="js">

import { QrcodeStream} from 'vue3-qrcode-reader'

export default{
   
   components: {
       QrcodeStream
   },

   data(){
    return{
      userVoucherPresentedId: null
    }
  }, 

   methods: {
       decode(decodedString) {
           console.log(decodedString)
           this.serVoucherPresentedId = decodedString
       },
       
   },


}
</script>