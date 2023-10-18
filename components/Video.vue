<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'


const videoEl = ref(null);

function increaseBrightness() {
  if (videoEl.value) {
    adjustBrightness(videoEl.value, 0.1);  
  }
}
function decreaseBrightness() {
  if (videoEl.value) {
    adjustBrightness(videoEl.value, -0.1); 
  }
}
function increaseContrast() {
  if (videoEl.value) {
    adjustContrast(videoEl.value, 0.1);  
  }
}
function decreaseContrast() {
  if (videoEl.value) {
    adjustContrast(videoEl.value, -0.1); 
  }
}

onMounted(() => {
  const options = {
    controls: true,
    autoplay: false,
    preload: 'auto',
    muted: false,
    width: 640,
    height: 360,
    sources: [{
      src: 'https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4',
      type: 'video/mp4'
    }]
  }
  const player = videojs(videoEl.value, options)
  videoEl.value.player = player;
})

onBeforeMount(() => {
  if (videoEl.value && videoEl.value.player) {
    videoEl.value.player.dispose();
  }
})
</script>

<template>
  <div class="container">
    <video ref="videoEl" class="video-js" />
    <div class="container-button">
      <span>Brillo: </span>
      <button @click="increaseBrightness">+</button>
      <button @click="decreaseBrightness">-</button>
    </div>
    <div class="container-button">
      <span>Contraste: </span>
      <button @click="increaseContrast">+</button>
      <button @click="decreaseContrast">-</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  outline: none;
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  &-button {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    span {
      color: $white;
    }
  }
}
</style>