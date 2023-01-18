<template>
  <div class="concerts-wrapper fade-in">
    <div>
      <div v-for="item in items" v-bind:key="item.info +Math.random()*1000" class="item">
        <div>
          <div class="date left"> {{ item.date }}</div>
          <div class="left">{{ item.name }}</div>
        </div>
        <div class="place left">
          {{ item.place }}
        </div>
        <div class="info">
          <a :href="item.info">Více informací</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Concerts",
  metaInfo: {
    title: "Koncerty | Funky Monx"
  },
  props: {
    items: {
      type: Array
    }
  },
}
</script>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 10px;
  margin-bottom: 30px;
}


.place {
  align-self: end;
}

.info {
  align-self: end;
}

.left {
  text-align: left;
}

.concerts-wrapper {
  font-size: 18px;
  width: 100%;
  max-width: 700px;
  display: block;
  justify-items: stretch;
}

@media (max-width: 700px) {
  .item {
    display: block;
  }

  .info {
    text-align: start;
  }

  .concerts-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;

  }

}

</style>
