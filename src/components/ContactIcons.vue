<template>
  <address>
    <ul class="ul">
      <li aria-label="telefon" class="li">
        <div class="a">
          <a :href="`tel:${contact.phone}`">
            <img class="gallery__img" :src="getSrc('phone')"/>
          </a>
        </div>
      </li>
      <li aria-label="e-mail" class="li">
        <div class="a">
          <a :href="`mailto:${contact.mail}`">
            <img class="gallery__img" :src="getSrc('mail')"/>
          </a>
        </div>
      </li>
    </ul>
  </address>
</template>
<script>

export default {
  name: "ContactIcons",
  props: {
    contact: Object
  },
  methods: {
    getSrc(key) {
      return require(`../assets/socials/${key}.svg`)
    },
  }
}
</script>

<style scoped>
@import "../assets/css/icon-panel.css";
</style>
