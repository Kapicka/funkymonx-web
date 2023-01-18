<template>
    <div class="gallery">
      <div class="gallery__top-panel">
        <close-button class="gallery__close-button" @click="$emit('close')"></close-button>
      </div>
      <div class="checkout__image-wrapper">
        <arrow-button class="gallery__nav-arrow gallery__arrow-right" @click="nextImg()"/>
        <arrow-button class="gallery__nav-arrow gallery__arrow-left" @click="prevImg()"/>
        <img class="gallery__img" v-if="currentImage" :alt=currentImage.alt :src="currentImage.src"
             :srcset="currentImage.srcSet"/>
      </div>
    </div>
</template>

<script>
import CloseButton from "@/components/buttons/CloseButton";
import ArrowButton from "@/components/buttons/ArrowButton";
import {fixed} from "@/data/store";

export default {
  name: "Gallery",
  components: { ArrowButton, CloseButton},
  data() {
    return {
      blabla:true,
      fixed: fixed,
      currentImage: undefined
    }
  },
  props: {
    images: {type: Array, default: () => []},
    imgIndex: {type: Number, default: 0}
  },

  beforeMount() {
    if (this.imgIndex < 0 || this.index > this.images.length - 1) {
      this.imgIndex = 0
    }
    if (this.images.length) {
      this.currentImage = this.images[this.imgIndex]
    }

  },
  mounted() {
    this.fixed.value = true
    window.addEventListener('keydown', this.handleKeyDown)

  },
  beforeDestroy() {
    this.fixed.value = false
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === 'ArrowRight') {
        this.nextImg()
      }
      if (event.key === 'ArrowLeft') {
        this.prevImg()
      }
      if (event.key === 'Escape') {
        this.close()
      }
    },
    nextImg() {
      this.imgIndex = (this.imgIndex + 1) % this.images.length
      this.currentImage = this.images[this.imgIndex]
    },
    prevImg() {
      this.imgIndex--
      if (this.imgIndex < 0) {
        this.imgIndex = this.images.length - 1
      }
      this.currentImage = this.images[this.imgIndex]
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/common.css";
@import "../../assets/css/animations.css";
@import "../../assets/css/theme.css";

.gallery__img {
  max-width: 1200px;
  max-height: 100vh;
  object-fit: contain;
}

.gallery__arrow-left {
  transform: scale(-1);
  left: 20px;
}

.gallery__arrow-right {
  right: 20px;
}

.gallery__nav-arrow {
  position: absolute;
  top: 50%;
}

.gallery {
  font-size: 30px;
  color: #ffbf00;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
}

.gallery__top-panel {
  top: 0px;
  left: 0px;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: end;
}

.checkout__image-wrapper {
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
}

.close-button {
  margin-top: 10px;
  margin-right: 20px;
}

</style>
