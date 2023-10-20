<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

const { videoUrl, noShowControls, options } = defineProps(['videoUrl', 'noShowControls', 'options']);

const emit = defineEmits(['update:time'])

const videoEl = ref(null);
const mediaRecorder = ref(null);
const recordedChunks = ref([]);
const recordedBlob = ref(null);
const isRecording = ref(false);
const isDownloaded = ref(false);

function startRecording() {
  recordedChunks.value = [];
  recordedBlob.value = null;
  mediaRecorder.value = new MediaRecorder(videoEl.value.captureStream());
  mediaRecorder.value.ondataavailable = event => {
    if (event.data.size > 0) {
      recordedChunks.value.push(event.data);
    }
  };
  mediaRecorder.value.onstop = () => {
    recordedBlob.value = new Blob(recordedChunks.value, { type: 'video/webm' });
  };
  mediaRecorder.value.onerror = (event) => {
    console.error('MediaRecorder error:', event.error);
  };
  mediaRecorder.value.start();
  isRecording.value = true;
  console.log('Recording started');
};

function stopRecording() {
  mediaRecorder.value.stop();
  isRecording.value = false;
  console.log('Recording stopped');
};

function toggleRecording() {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
};

function downloadRecording() {
  const url = URL.createObjectURL(recordedBlob.value);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recording.webm';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  isDownloaded.value = true;
};
function increaseBrightness() {
  if (videoEl.value) {
    adjustBrightness(videoEl.value, 0.1);  
  }
};
function decreaseBrightness() {
  if (videoEl.value) {
    adjustBrightness(videoEl.value, -0.1); 
  }
};
function increaseContrast() {
  if (videoEl.value) {
    adjustContrast(videoEl.value, 0.1);  
  }
};
function decreaseContrast() {
  if (videoEl.value) {
    adjustContrast(videoEl.value, -0.1); 
  }
};
function handleTimeUpdate(event) {
  const video = event.target;
  emit('update:time', video.currentTime);
};

const buttonLabel = computed(() => (isRecording.value ? 'Detener' : 'Grabar'));

onMounted(() => {
  const options = {
    controls: noShowControls,
    autoplay: true,
    loop: true,
    preload: 'auto',
    muted: false,
    width: 1000,
    height: 500,
    preferFullWindow: false,
    controlBar:{
      fullscreenToggle: false,
      pictureInPictureToggle: false,
    },
    sources: [{
      src: videoUrl,
      type: 'video/mp4'
    }]
  }
  const player = videojs(videoEl.value, options)
  videoEl.value.player = player;

  videoEl.value.addEventListener('timeupdate', handleTimeUpdate);
})

onBeforeMount(() => {
  if (videoEl.value && videoEl.value.player) {
    videoEl.value.player.dispose();
    videoEl.value.removeEventListener('timeupdate', handleTimeUpdate);
  }
})
</script>

<template>
  <div class="container" :class="{ 'pointer-events-none': options }">
    <div class="container-video">
      <video ref="videoEl" crossorigin="anonymous" class="video-js video" />
      <div class="buttons-center-bottom">
        <button v-if="!recordedBlob" @click="toggleRecording" class="recording">
          🔴
        </button>
        <button v-if="recordedBlob && !isDownloaded" @click="downloadRecording" class="download">
          Descargar
        </button>
      </div>
      <div class="buttons-container">
        <div class="container-button-group">
          <div class="container-button">
            <span>Brillo: </span>
            <button @click="increaseBrightness" class="option">
              <i class="fa-solid fa-plus"/>
            </button>
            <button @click="decreaseBrightness" class="option">
              <i class="fa-solid fa-minus"/>
            </button>
          </div>
          <div class="container-button">
            <span>Contraste: </span>
            <button @click="increaseContrast" class="option">
              <i class="fa-solid fa-plus"/>
            </button>
            <button @click="decreaseContrast" class="option">
              <i class="fa-solid fa-minus"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.option {
  background-color: rgba($grey, 0.6);
  border-radius: 8px;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: $white;
  font-size: $body-font-size;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10000;
}

.container-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;  
    object-position: center; 
  }
  .buttons-center-bottom {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    .recording, .download {
      background: none;
      color: $white;
      border: none;
      font-size: $body-font-size;
      margin-bottom: 12px;
      cursor: pointer;
    }
    .recording {
      font-size: 48px;
      width: 50px;
      height: 50px;
    }
  }
  .buttons-container {
    position: absolute;
    top: 10px;
    right: 10px;
    .container-button-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      margin-bottom: 25px;
      .container-button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        span {
          color: $white;
        }
        i {
          color: $purple;
          font-size: $body-font-size * 2;
        }
      }
    }
  }
}
.pointer-events-none {
  pointer-events: none;
}
</style>
