<template>
  <div class="merch-item fade-in">
    <h2 class="merch-item__title"> {{ item.name }} </h2>
    <div :style="{'background-image':`url(${item.imageSrc})`}" class="merch-item__img-container">
    </div>
    <mx-button @click="$emit('selected-item')" class="relative mt30">TO CHCI!</mx-button>
  </div>
</template>

<script>
import MxButton from "@/components/buttons/MxButton";

export default {
  name: "MerchItem",
  props: {item: Object},
  components: {MxButton},
}
</script>

<style scoped>
.merch-item__img-container {
  width: 350px;
  height: 250px;
}

.merch-item__title {
  font-size: 22px;
}

.merch-item__img-container {
  width: 100%;
  background-size: cover;
}


</style>
