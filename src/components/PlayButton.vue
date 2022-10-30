<template>
  <svg v-if="!isPlaying" width="110" height="110" viewBox="0 0 110 110" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <circle cx="55" cy="55" r="55" fill="black" fill-opacity="0.82"/>
    <path
        d="M80.2026 50.1367C83.6138 52.0455 83.6138 56.9545 80.2026 58.8633L46.6916 77.6156C43.3588 79.4806 39.25 77.0715 39.25 73.2523L39.25 35.7477C39.25 31.9285 43.3588 29.5194 46.6916 31.3844L80.2026 50.1367Z"
        fill="#FFBF00"/>
  </svg>
  <svg v-else width="110" height="110" viewBox="0 0 110 110" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <circle cx="55" cy="55" r="55" fill="black" fill-opacity="0.82"/>
    <rect x="37" y="31" width="12" height="47" fill="#FFBF00"/>
    <rect x="62" y="31" width="12" height="47" fill="#FFBF00"/>
  </svg>

</template>

<script>
export default {
  name: "PlayButton",
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    }

  }
}
</script>

<style scoped>

</style>
