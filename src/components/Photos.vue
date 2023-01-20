<template>
  <section class="gallery fade-in">
    <gallery :img-index="imgIndex" @close="()=>{this.gallery=false}" v-if="gallery" :images="images"/>
    <div ref="photo_list" class="photo_list">
      <img class="gallery__img fade-in" v-bind:key="img.alt+i" v-for="(img,i) in loadedImages" @click="openGallery(i)"
           loading="lazy"
           :srcset="img.srcSet"/>
    </div>
  </section>
</template>
<script>

import Gallery from "@/components/buttons/Gallery";

export default {
  name: "Photos",
  metaInfo: {
    title: 'Fotky | Funky Monx'
  },
  components: {Gallery},
  data() {
    return {
      imgIndex: 0,
      loadedImages: [],
      gallery: false,
    }
  },
  props: {
    items: Array
  },
  computed: {
    images() {
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
      return srcSet.reduce((acc, entry) => `${acc}${this.getPhoto(entry.src)} ${entry.dw},`, '')

    },
    getPhoto(src) {
      return require(`../assets/gallery/${src}`)
    },
    getCover(src) {
      return require(`../assets/covers/${src}`)
    },
  },
  beforeMount() {
    this.items.forEach(image => {
      const imageElement = new Image()
      const srcSet = this.getSrcSet(image.srcSet)
      imageElement.addEventListener('load', () => {
        this.loadedImages.push({src: image.src, srcSet, alt: image.alt})
      });
      imageElement.srcset = srcSet
    })
  },
}
</script>
<style scoped>
.gallery {
  width: 100%;
}

.gallery__img {
  cursor: pointer;
}

.photo_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

@media (max-width: 700px) {
  .photo_list {
    display: block;
    width: 100%;
  }

  .gallery__img {
    margin-top: 30px;
  }

}

</style>
