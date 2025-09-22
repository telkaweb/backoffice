<template>
  <div
      :class=" source === 'ShowFileComponent' ? 'video-player-container-normal' : 'video-player-container-online-class'">
    <video ref="videoPlayer" crossorigin="anonymous"
           class="video-js vjs-fill"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import dynamicWatermark from 'videojs-dynamic-watermark';

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    source: {
      type: String
    }
  },
  data() {
    return {
      player: null,
      windowWidth: 1000
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    videojs.registerPlugin('dynamicWatermark', dynamicWatermark)
    let myPlayer = this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
    })
    let USER = this.$store.state.user
    if (this.$route.path !== '/') {
      myPlayer.dynamicWatermark({
            elementId: 'watermark-content',
            watermarkText: USER.name + 'شهر',
            changeDuration: 7000,
            cssText: 'display: inline-block; color: grey; background-color: transparent; font-size: 0.5rem; z-index: 9999; position: absolute; @media only screen and (max-width: 992px){font-size: 0.8rem;}'
          }
      )
    }
  },
}
</script>

<style>
.video-player-container-normal {
  width: 100%;
  height: 60vh
}

.video-player-container-online-class {
  width: 100%;
  height: 100%
}

video {
  border-radius: 1vw !important;
}

.video-js {
  border-radius: 1vw !important;
}

.vjs-control-bar {
  border-radius: 0 0 1.2vw 1.2vw !important;
}
</style>