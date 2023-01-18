<template>
  <div class="album-info">
    <div class="album-title">{{ album.name }}</div>
    <div class="flex">
      <div class="w100 square" :style="{'background-image':`url(${getCover(album.cover)})`}">
        <play-button class="play-button" @click.native="playMusic()" :isPlaying="isPlaying"></play-button>
      </div>
      <div class="icons-alignment">
        <div class="w50">
          <div :key="entry.link" v-for="entry in album.socials">
            <div class="a">
              <a :href="entry.link">
                <img class="gallery__img" :src="getIcon(entry.key)"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audio" :src="getAudio(album.audio)"></audio>
  </div>
</template>

<script>
import PlayButton from "@/components/buttons/PlayButton";

export default {
  name: "PlayerModule",
  components: {PlayButton},
  data() {
    return {
      audio: undefined
    }
  },
  mounted() {
    this.audio = this.$refs.audio
  },
  methods: {
    playMusic() {
      if (!this.isPlaying) {
        this.$emit('song-play', this.album.key)
      } else {
        this.$emit('song-stop', this.album.key)
      }
    },
    getAudio(src) {
      return require(`../assets/audio/${src}`)
    },
    getCover(src) {
      return require(`../assets/covers/${src}`)
    },
    getIcon(src) {
      return require(`../assets/socials/${src}.svg`)
    }

  },
  watch: {
    isPlaying() {
      if (!this.isPlaying) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    }
  },
  props: {
    id: Number,
    isPlaying: {
      type: Boolean,
      default: false
    },
    album: {
      type: Object
    }
  },
}
</script>

<style scoped>
.square {
  width: 190px;
  height: 190px;
  border: 1px solid black;
  background-size: cover;
}


.album-info {
  width: 240px;
  background-color: #1e1d1d;
  padding: 10px 15px 15px 20px;
}

.flex {
  height: 200px;
  display: flex;
  align-items: start;
  align-content: start;
}

.icons-alignment {
  margin-left: 15px;
  display: flex;
  align-content: end;
  align-items: end;
  height: 100%;

}

.play-button {
  margin-top: 95px;
  margin-left: 125px;
  width: 50px;
  cursor:pointer;
}

.album-title {
  font-size: 20px;
  padding-bottom: 10px;
}

.w50 {
  align-content: center;
  width: 35px;
}

</style>
