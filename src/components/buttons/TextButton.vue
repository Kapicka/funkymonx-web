<template>
 <button @click="$emit('click')" class="text-button"><slot></slot></button>
</template>

<script>
export default {
  name: "TextButton"
}
</script>

<style scoped>
.text-button {
  border: none;
  cursor: pointer;
  background-color: transparent;
}

</style>