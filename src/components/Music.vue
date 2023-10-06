<template>
  <div class="music fade-in ">
    <div v-if="music.albums.length">
      <h2 class="center-xs"> Alba </h2>
      <div class="flex flex-wrap-wrap gap-30">
        <album-info
            class="album-info fade-in"
            v-for="album in loadedAlbums"
            @song-play="(key)=>onSongChange(key)"
            @song-stop="()=>onSongChange(undefined)"
            :key="album.key"
            :is-playing=" playingAlbumKey===album.key"
            :album="album">
        </album-info>
      </div>
    </div>
    <div v-if="music.singles.length">
      <h2> Singly a EP</h2>
      <div class="center-xs flex flex-wrap-wrap gap-30">
        <album-info
            class="album-info fade-in"
            v-for="(album) in loadedSingles"
            @song-play="(key)=>onSongChange(key)"
            @song-stop="()=>onSongChange(undefined)"
            :key="album.key"
            :is-playing=" playingAlbumKey===album.key"
            :album="album">
        </album-info>
      </div>
    </div>
    <div v-if="music.videos.length">
      <h2 class="h2-xs"> Video</h2>
      <div class="flex flex-wrap-wrap gap-30">
        <div v-bind:key="video.key" v-for="video of music.videos"
             class="video-item fade-in">
          <iframe class="iframe" :src="video.link"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AlbumInfo from "@/components/AlbumInfo";
import {music} from "@/data/store";

export default {
  name: "Music",
  metaInfo: {
    title: "Hudba | Funky Monx"
  },
  components: {AlbumInfo},
  items: {type: Array},
  methods: {
    onSongChange(key) {
      this.playingAlbumKey = key
    },
    getCover(src) {
      return require(`../assets/covers/${src}`)
    },
  },
  beforeMount() {
    music.albums.forEach(album => {
      const image = new Image()
      image.addEventListener('load', () => {
        this.loadedAlbums.push(album)
      })
      image.src = this.getCover(album.cover)
    })
    music.singles.forEach(album => {
      const image = new Image()
      image.addEventListener('load', () => {
        this.loadedSingles.push(album)
      })
      image.src = this.getCover(album.cover)
    })
  },
  data() {
    return {
      music: music,
      loadedAlbums: [],
      loadedSingles: [],
      playingAlbumKey: undefined
    }

  }
}
</script>

<style scoped>
@import "../assets/css/animations.css";

.flex {
  display: flex;
}

.gap-30 {
  gap: 30px;
}

.music {
  color: white;
  text-align: left;
  width: 100%;
  padding-bottom: 100px;
}

.video-item {
  pointer-events: all;
}


.iframe {
  max-width: 560px;
  height: 230px;
}

@media (max-width: 500px) {
  .flex {
    display: flex;
    justify-content: center;
  }

  .h2-xs {
    text-align: center;
  }

  .iframe {
    width: 100%;
  }
}

</style>
