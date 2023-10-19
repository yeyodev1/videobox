<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

const { videoUrl, showControls, options } = defineProps(['videoUrl', 'showControls', 'options']);

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
    controls: showControls,
    autoplay: true,
    loop: true,
    preload: 'auto',
    muted: false,
    width: 640,
    height: 360,
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
        <div class="container-recording-buttons">
          <button v-if="!recordedBlob" @click="toggleRecording" class="download">
            {{buttonLabel}}
          </button>
          <button v-if="recordedBlob" @click="downloadRecording" class="download">
            Descargar
          </button>
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
  width: 100%;
  max-width: $desktop-lower-breakpoint;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
}

.container-video {
  position: relative;
  width: 100%;
  .video {
    width: 100%;
  }
  .buttons-container {
    position: absolute;
    bottom: 10px;
    left: 10px;
    bottom: 48px;
    & .container-button-group .container-button {
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

.container-button-group,
.container-recording-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  .download {
    background: none;
    color: $white;
    border: none;
    font-size: $body-font-size;
    margin: 0;
    padding: 0;
  }
}
.pointer-events-none {
  pointer-events: none;
}

</style>
