<template>
  <textarea :placeholder="placeholder"
            :value="model"
            @input="handleInput" class="textarea text-input"/>
</template>

<script>
export default {
  name: "TextareaInput",
  props: {
    placeholder: {type: String},
    model: {
      type: String
    }
  },
  methods: {
    handleInput(e) {
      this.resizeTextArea(e)
      this.$emit('input', e.target.value)
    },
    resizeTextArea(event) {
      const textarea = event.target
      textarea.style.height = ''
      textarea.style.height = textarea.scrollHeight + 'px'
    },
  }
}
</script>

<style scoped>
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

.text-input:hover {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}

.text-input:focus {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}

.textarea {
  font-family: RobotoMono-Medium;
  overflow: hidden;
  font-size: 20px;
  margin-top: 10px;
  resize: none;
  background: inherit;
  box-sizing: border-box;
  height: 40px;
}

.textarea::placeholder {
  font-family: RobotoMono-Medium;
  font-size: 20px;
}

</style>