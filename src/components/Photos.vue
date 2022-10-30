<template>
  <section class="gallery fade-in">
    <gallery :img-index="imgIndex" @close="()=>{this.gallery=false}" v-if="gallery" :images="loadedImgs"/>
    <div class="photo_list">
      <img class="img" v-bind:key="img.alt+i" v-for="(img,i) in loadedImgs" @click="openGallery(i)" loading="lazy"
           :srcset="img.srcSet"
           :src="loadedImgs.src"/>
    </div>
  </section>
</template>
<script>

import Gallery from "@/components/Gallery";

export default {
  name: "Photos",
  components: {Gallery},
  data() {
    return {
      imgIndex: 0,
      gallery: false,
    }
  },
  props: {
    items: Array
  },
  computed: {
    loadedImgs() {
      return this.items.map(i => ({
            ...i,
            src: this.getPhoto(i.src),
            srcSet: this.getSrcSet(i.srcSet)
          })
      )
    }
  },
  methods: {
    openGallery(index) {
      this.imgIndex = index
      this.gallery = true
    },
    getSrcSet(srcSet) {
      console.log(srcSet)
      return srcSet.reduce((acc, entry) => `${acc}${this.getPhoto(entry.src)} ${entry.dw},`, '')

    },
    getPhoto(src) {
      return require(`../assets/gallery/${src}`)
    },
  }
}
</script>
<style scoped>
.gallery {
  width: 100%;
}
.img {
  cursor: pointer;
}
.photo_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

</style>
