<template>
  <nav class="nav">
    <ul class="nav-ul">
      <li v-bind:key="item.label" v-for="item in items" class="nav-li" >
        <router-link class="text nav-link"
                     v-bind:class="{'active': page===item.key}"
                     @click.native="$emit('change',item.key)"
                     :to="item.link">
          {{ autocapitalize ? item.label.toUpperCase() : item.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Navigation",
  components: {},
  props: {
    items: Array,
    autocapitalize: {type: Boolean, default: true},
    page: {
      type: String
    }
  },
}
</script>

<style scoped>

.nav-ul {
  text-decoration: none;
  nav-list-style: none;
  padding: 0;
}

.nav {
  transform: rotate(270deg);
}

.nav-li {
  display: inline-block;
  nav-list-style: none;
  cursor: pointer;
  padding-top: 4px;
}

.text {
  font-weight: bold;
  color: #ffbf00;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

.active {
  border-top: 3px solid #ffbf00;;
}

.nav-link {
  text-decoration: none;
}

.nav-li:hover {
  filter: brightness(0.9);
}

@media(max-width: 500px) {
  .text {
   font-size:  16px;
  }
}

</style>
