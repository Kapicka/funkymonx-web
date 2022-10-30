<template>
  <ul class="ul">
    <li :aria-label="c.key" class="li" v-for="c in iconLinks" :key="c.key">
      <div class="a">
        <a :href="c.link">
          <img class="img" :src="getSrc(c.key)"/>
        </a>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    iconLinks: Array
  },
  name: "IconLinks",
  methods: {
    getSrc(key) {
      return require(`../assets/socials/${key}.svg`)
    }
  }
}
</script>

<style scoped>
@import "../assets/css/icon-panel.css";


</style>
