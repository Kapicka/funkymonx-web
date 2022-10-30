<template>
    <div class="music fade-in">
      <div v-if="music.albums.length">
        <h2 class="center-xs"> Alba </h2>
        <div class="flex flex-wrap-wrap gap-30">
          <album-info
              class="album-info"
              v-for="album in music.albums"
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
              class="album-info"
              v-for="(album) in music.singles"
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
               class="video-item">
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
  components: {AlbumInfo},
  items: {type: Array},
  methods: {
    videoClicked() {
      this.playingAlbumKey = undefined
      console.log('hello')
    },
    onSongChange(key) {
      this.playingAlbumKey = key
    },
  },

  data() {
    return {
      music: music,
      playingAlbumKey: undefined
    }

  }
}
</script>

<style scoped>

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
