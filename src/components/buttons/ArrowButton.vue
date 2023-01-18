<template>
  <button @click="$emit('click')" class="button">
      <div class="arrow-1"></div>
  </button>
</template>

<script>
export default {
  name: "ArrowButton"
}
</script>

<style scoped>

.arrow-1 {
  height: 15px; width: 15px;
  border: 1px solid white;
  border-width: 3px 3px 0 0;
  transform: rotate(45deg);
  padding: 0;
}
.arrow-1:hover{
  border-color: #ffbf00;
}
.button {
  margin: 0;
  outline: none;
  width: 25px;
  height: 25px;
  border: none;
  background-color: transparent;
}
/* Just centering the examples */
</style>
