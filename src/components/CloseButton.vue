<template>
<button @click="$emit('click')" class="close-button">
  <div class="line line-1"></div>
  <div class="line line-2"></div>
</button>
</template>

<script>
export default {
  name: "CloseButton"
}
</script>

<style scoped>
.line {
  left: 0px;
  top: 50%;
  position: absolute;
  width: 100%;
  height: 10%;
  background-color: white;
}

.line-1 {
  transform: rotate(45deg);
}

.line-2 {
  transform: rotate(-45deg);
}

.close-button {
  position: relative;
  width: 25px;
  height: 25px;
  border: none;
  text-decoration: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}
.close-button:hover .line {
  background-color: #ffbf00;
}

</style>
