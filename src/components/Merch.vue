<template>
  <div class="merch">
    <modal @close="setSelectedItem(undefined)" v-if="selectedItem">
      <checkout @order-completed="setSelectedItem(undefined)" class="checkout" :item="selectedItem"/>
    </modal>
    <div class="merch-items">
      <merch-item @selected-item="setSelectedItem(item)"
                  class="merch-items__item"
                  v-bind:key="item.name"
                  :item="item"
                  v-for="item in merchItems"/>
    </div>
  </div>
</template>
<script>

import MerchItem from "@/components/MerchItem";
import {merchItems} from "../data/store";
import Modal from "@/components/Modal";
import Checkout from "@/components/Checkout";

export default {

  name: "Merch",
  metaInfo:{
    title:'Merch | Funky Monx',
   meta:[
     { name: 'description', content: 'Merch kapely Funky Monx k zakoupení, placky, CD a jiné.' }   ]
  },
  components: {Checkout, Modal, MerchItem},
  methods:{
    setSelectedItem(item){
      console.log('wtf')
      this.selectedItem = item
    }
  },
  data() {
    return {
      merchItems,
      selectedItem:undefined
    }
  }
}

</script>

<style scoped>
@import '../assets/css/common.css';
.merch {
  width: 100%;
}
.merch-items__item {
  max-width: 300px;
}
.merch-items {
  gap: 30px;
  width: 100%;
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fit, 300px);
}
@media (max-width: 700px) {
  .merch-items__item {
    max-width: 100%;
    width: 100%;
  }
  .merch-items {
    display: block;
  }
}

</style>
