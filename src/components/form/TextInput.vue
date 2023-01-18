<template>
  <input :value="model" :placeholder="placeholder" @input="(e)=>$emit('input',e.target.value)" type="text"
         class="text-input"/>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    placeholder: {type: String, default: ''},
    model: {
      type: String
    }
  }
}
</script>

<style scoped>

.text-input:hover {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}

.text-input {
  font-family: RobotoMono-Medium;
  border: none;
  border-bottom: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  width: 100%;
  padding: 0 10px 10px;
  color: white;
  font-size: 20px;
  vertical-align: baseline;
}

.text-input:focus {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}
.text-input::placeholder {
  font-family: RobotoMono-Medium;
  font-size: 20px;
}

</style>