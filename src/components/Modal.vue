<template>
  <div class="modal">
    <div class="modal__wrapper">
      <div v-if="closeButton" class="close-panel">
        <close-button @click="$emit('close')" class="modal__close-panel-close"/>
      </div>
      <div class="modal__content"></div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {fixed} from "@/data/store";
import CloseButton from "@/components/buttons/CloseButton";

export default {
  name: "Modal",
  props: {
    closeButton: {
      default: true,
    }
  },
  components: {CloseButton},

  data() {
    return {
      fixed
    }
  },
  mounted() {
    this.fixed.value = true
  },
  beforeDestroy() {
    this.fixed.value = false
  },
}
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0px;
  margin-top: 0px;
  position: absolute;
  top: 0;
  opacity: 1;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.79);
  z-index: 10000;
}

.modal__wrapper {
  background-color: #1e1d1d;
}

.modal__content {
  display: flex;
  justify-content: center;
  align-items: center;

}

.close-panel {
  width: 100%;
  display: flex;
  justify-content: end;
}

.modal__close-panel-close {
  margin-top: 10px;
  margin-right: 15px;
}

@media (max-width: 700px) {
  .overlay {
    display: flex;
    justify-content: center;
  }

  .modal__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal__wrapper {
    background-color: #1e1d1d;
    width: 90%;
  }

  .modal__close-panel-close {
    margin-top: 15px;
    margin-right: 15px;
  }
}
</style>
