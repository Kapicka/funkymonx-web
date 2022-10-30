<template>
  <button class="mx-button" @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "MxButton"
}
</script>

<style scoped>

.mx-button {
  color: white;
  border: 3px solid black;
  font-size: 18px;
  border-radius: 10px;
  background-color: #ffbf00;
  font-family: RobotoMono-Medium;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}



</style>
