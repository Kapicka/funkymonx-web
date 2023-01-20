<template>
  <div class="preloader">
    <div class="preloader__content">
      <MonxIcon class="preloader__icon rotate"/>
      <p class="preloader__description" v-if="description">{{description}}</p>
    </div>
  </div>
</template>

<script>
import MonxIcon from "@/components/MonxIcon";

export default {
  name: "Preloader",
  components: {MonxIcon},
  props: {
    description: {
      type: String
    }
  }
}
</script>

<style scoped>
.preloader {
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10001;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preloader__description {
  margin-top: 70px;
}

.rotate {
  animation: rotation 2.5s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

</style>