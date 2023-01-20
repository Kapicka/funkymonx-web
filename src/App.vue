<template>
  <div class="app" v-bind:class="{'fixed-app':fixed.value}">
    <header class="header">
      <div>
        <div class="header__top-panel">
          <text-button @close="()=>{subscribeModal=false}" @click="()=>{subscribeModal = true}"
                       class="header__subscribe-button default-font">Sledujte nás!
          </text-button>
        </div>
        <router-link to="/" class="text-decoration--none">
          <h1 @click="changePage('home')" class="header__title  ">
            <span>FUNKY </span>
            <span>MONX</span>
          </h1>
        </router-link>
      </div>
    </header>
    <div class="icon-links">
      <icon-links :iconLinks="iconLinks"/>
      <contact-icons :contact="monxContact"/>
    </div>
    <navigation @change="changePage" :page="currentPage" class="navigation" :items="navItems"/>
    <div class="content">
      <div class="content_align">
        <router-view></router-view>
      </div>
    </div>
    <div class="overlay" v-bind:class="{ 'overlay--darken':overlay.visible, 'overlay--light':!overlay.visible }"/>
    <video v-if="videoLoaded" ref="video" autoplay loop muted playsinline class="bg-video">
      <source :src="getVideoSrc()" type="video/mp4">
    </video>
    <!--  Modals-->
    <subscribe-dialogue @close="()=>{subscribeModal = false}" v-if="subscribeModal"/>
    <preloader v-if="preloaderData.visible" :description="preloaderData.description"/>

  </div>
</template>
<script>

import Navigation from "@/components/Nav";
import {navigation, iconLinks, events, monxContact, preloaderData} from "@/data/store";
import {overlay, fixed} from "@/data/store";
import IconLinks from "@/components/IconLinks";
import ContactIcons from "@/components/ContactIcons";
import TextButton from "@/components/buttons/TextButton";
import SubscribeDialogue from "@/components/SubscribeDialogue";
import Preloader from "@/components/Preloader";

export default {
  name: 'App',
  components: {
    SubscribeDialogue,
    TextButton,
    ContactIcons,
    Navigation,
    IconLinks,
    Preloader,
  },
  data() {
    return {
      navigation,
      iconLinks,
      monxContact,
      events,
      overlay,
      preloaderData,
      videoLoaded: false,
      fixed,
      currentPage: 'home',
      subscribeModal: false,
    }
  },
  mounted() {
    if (this.$route.path === '/') {
      overlay.visible = false
    } else {
      overlay.visible = true
    }
    const video = document.createElement("video");
    video.addEventListener('canplaythrough', this.handleVideoLoaded)
    video.src = this.getVideoSrc()
  },
  updated() {
    if (this.$route.path === '/') {
      overlay.visible = false
    } else {
      overlay.visible = true
    }
  },
  computed: {
    navItems() {
      const ret = navigation.reverse().map(n => ({...n, active: false}))
      if (ret.length) {
        ret[ret.length - 1].active = true
      }
      return ret
    }
  },
  methods: {
    handleVideoLoaded() {
      this.videoLoaded = true
      preloaderData.visible = false
    },
    changePage(page) {
      this.currentPage = page
    },
    getVideoSrc() {
      return require(`./assets/monx.mp4`)
    }
  }
}
</script>

<style>
@import "./assets/css/theme.css";
@import "./assets/css/common.css";

@font-face {
  font-family: "RubikDirt-Regular";
  src: local("RubikDirt-Regular"),
  url(./assets/font/RubikDirt-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "RobotoMono-Medium";
  src: local("RobotoMono-Medium"),
  url(./assets/font/RobotoMono-Medium.ttf) format("truetype");
}

body {
  margin: 0px;
  padding: 0px;
}

.bg-video {
  position: fixed;
  min-width: 100%;
  min-height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
  object-fit: contain;
}


.content {
  padding-top: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.content_align {
  width: calc(100vw - 200px);
  justify-content: center;
  display: flex;
  overflow: scroll;
  height: calc(100vh - 100px);
  width: calc(100vw - 200px);
  justify-content: center;
  display: flex;
}

.overlay {
  transition: 400ms opacity linear;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.overlay--darken {
  opacity: 0.9;
}

.overlay--light {
  opacity: 0.3;
}

.icon-links {
  position: fixed;
  top: 200px;
  left: 40px;
}

.fixed-app {
  height: 100vh;
  overflow: hidden;
}

.navigation {
  position: fixed;
  height: 32px;
  width: 600px;
  top: calc(50vh - 16px);
  right: calc((32px / 2) - (600px / 2) + 50px);
}

.app {
  font-family: RobotoMono-Medium, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

button {
  font-family: RobotoMono-Medium;
}

.header {
  position: fixed;
  width: 100vw;
  overflow: hidden;

}

.header__top-panel {
  width: 100%;
  display: flex;
  justify-content: end;
}

.header__subscribe-button {
  text-decoration: underline;
  font-size: 14px;
  font-style: italic;
  padding: 0;
  margin-right: 20px;
  margin-top: 5px;
}

.header__title {
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 36px;
  padding-top: 0px;
  margin-top: 0px;
  color: #ffbf00;
}


@media (max-width: 500px) {
  .content {
    padding-left: 0px;
    padding-right: 0px;
  }

  .icon-links {
    left: 10px;
    width: 25px;
  }


  .navigation {
    right: calc((32px / 2) - (600px / 2) + 20px);
  }

  .content_align {
    width: calc(100% - 120px);
  }
}
</style>
