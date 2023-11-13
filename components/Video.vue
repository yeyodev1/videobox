<script setup>
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import saveAs from 'file-saver';
import axios from 'axios';

import VideoService from '@/services/Videos/Videos'

import useUserStore from '@/store/userStore';

const videoService = new VideoService();

const route = useRoute();

const userStore = useUserStore();

const router = useRoute()

const { videoUrl, noShowControls, options } = defineProps(['videoUrl', 'noShowControls', 'options']);

const emit = defineEmits(['update:time', 'captured-video'])

const videoEl = ref(null);
const mediaRecorder = ref(null);
const recordedChunks = ref([]);
const recordedBlob = ref(null);
const isRecording = ref(false);
const isDownloaded = ref(false);
const timeBlur = ref(false);
const isRecordingActive = ref(false);
const player = ref(null);
const URL = ref(window.URL);
const selectionStart = ref(null);
const selectionEnd = ref(null);
const selectionStarted = ref(false);
const startTimeSelected = ref(null);
const endTimeSelected = ref(null);
const videoId = ref(extractVideoIdFromUrl(videoUrl.value));
const videoProcessingTask = ref({
  taskId: null,
  status: '',
  url: ''
});

console.log('params:', route.params)

const isLoggedIn = computed(() => userStore.user !== null);
const isAdmin = computed(() => userStore.user?.role?.includes('admin') ?? false);
const linkDestination = computed(() => isLoggedIn.value ? `/purchase` : '/userRegister');
const videoPurchased = computed(() => {
  const video = userStore.user.videos.find(video => video.url === videoUrl);
  return video ? true : false;
});
const isBlurred = computed(() => {
  if (isAdmin.value) {
    return false;
  }
  if (!isLoggedIn.value) {
    return true;
  }
  if (videoPurchased.value && isLoggedIn.value) {
    return false;
  }
  return true;
});
const buttonText = computed(() => isLoggedIn.value ? 'Compra aquí tu partido' : 'Regístrate o inicia sesión para ver el video')


function extractVideoIdFromUrl(videoUrl) {
  const decodedUrl = decodeURIComponent(videoUrl);
  const videoNameWithExtension = decodedUrl.split('/').pop();
  const videoId = videoNameWithExtension.split('.').slice(0, -1).join('.');

  return videoId;
}

function secondsToHms(d) {
    d = Number(d);

    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

async function cutAndUploadVideo(start, end, videoId) {
  try {
    const { taskId } = await videoService.cutVideo(secondsToHms(start), secondsToHms(end), videoId);
    videoProcessingTask.value.taskId = taskId;
    videoProcessingTask.value.status = 'pending';
    console.log('Task id received:', taskId);

    console.log('task id', videoProcessingTask.value.taskId)
    await checkVideoStatus(videoProcessingTask.value.taskId);
  } catch (error) {
    console.error('error al cargar y subir el video', error)
  }
}

async function checkVideoStatus(taskId) {
  if (!taskId) {
    console.error('Task ID no definido.');
    return;
  }
  try {
    const response = await videoService.checkVideoStatus(taskId);
    console.log(response)
    videoProcessingTask.value.status = response.status;
    if (response.status === 'completed') {
      // Aquí manejarías el enlace de descarga
      videoProcessingTask.value.url = response.url;
    } else {
      // Si el video aún está procesándose, vuelve a comprobar después de un tiempo
      setTimeout(() => checkVideoStatus(taskId), 5000); // Verificar cada 5 segundos
    }
  } catch (error) {
    console.error('Error al verificar el estado del video:', error);
  }
}



function handleSelection() {
  if (selectionStart.value === null) {
    selectionStart.value = player.value.currentTime();
    console.log(`Tiempo de inicio seleccionado: ${selectionStart.value}`);
  } else {
    selectionEnd.value = player.value.currentTime();
    console.log(`Tiempo de fin seleccionado: ${selectionEnd.value}`);
    console.log('videoid: ', route.params.video)
    cutAndUploadVideo(selectionStart.value, selectionEnd.value, route.params.video);
    selectionStart.value = null;
    selectionEnd.value = null;
  }
}

function downloadVideo() {
  if (videoProcessingTask.value.url) {
    window.location.href = videoProcessingTask.value.url; 
  }
}

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

function shouldPauseVideo() {
  if (isAdmin.value || videoEl.value.currentTime < 15) {
    return false;
  }
  if (!isLoggedIn.value) {
    return true;
  }
  if (videoPurchased.value && isLoggedIn.value) {
    return false;
  }
  if (videoEl.value.currentTime >= 15) {
    timeBlur.value = true;
    return true;
  }
  return false;
}

function handleTimeUpdate(event) {
  const video = event.target;
  emit('update:time', video.currentTime);
  if (shouldPauseVideo()) {
    videoEl.value.pause();
  }
};


onMounted(() => {
  const options = {
    controls: noShowControls,
    autoplay: true,
    loop: true,
    preload: 'auto',
    muted: true,
    width: 1000,
    height: 500,
    preferFullWindow: false,
    controlBar: {
      fullscreenToggle: false,
      pictureInPictureToggle: false,
      playbackRateMenuButton: true,
    },
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [{
      src: videoUrl,
      type: 'video/mp4'
    }]
  }
  player.value = videojs(videoEl.value, options)
  videoEl.value.player = player.value;

  videoEl.value.addEventListener('timeupdate', handleTimeUpdate);

  localStorage.setItem('lastVideoUrl', window.location.pathname + window.location.search);
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
        <video 
          playsinline 
          ref="videoEl" 
          crossorigin="anonymous" 
          :class="{ blurred: isBlurred && timeBlur }"
          class="video-js video" 
          />
          <div v-if="isBlurred" class="overlay">
            <button class="overlay-button">
              <NuxtLink :to="linkDestination"> {{ buttonText }} </NuxtLink> 
            </button>
          </div>
        <div class="buttons-center-bottom">
          <button @click="handleSelection" class="recording" >
            <span class="circle" :class="{ 'active': isRecordingActive }"></span>
          </button>
          <button
            v-if="videoProcessingTask.status" 
            @click="downloadVideo"  
            class="download">
            Descargar
          </button>
          <div class="captured-video-container" v-if="recordedBlob">
            <video ref="capturedVideoEl" controls :src="URL.createObjectURL(recordedBlob)" width="240" height="160"></video>
          </div>
        </div>
        <div class="buttons-container">
          <div class="container-button-group">
            <div class="container-button">
              <span>Brillo: </span>
              <button @pointerup="increaseBrightness" class="option">
                <i class="fa-solid fa-plus"/>
              </button>
              <button @pointerup="decreaseBrightness" class="option">
                <i class="fa-solid fa-minus"/>
              </button>
            </div>
            <div class="container-button">
              <span>Contraste: </span>
              <button @pointerup="increaseContrast" class="option">
                <i class="fa-solid fa-plus"/>
              </button>
              <button @pointerup="decreaseContrast" class="option">
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

  &:active {
    background-color: rgba($grey, 0.8);
  }
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

.blurred {
  filter: blur(10px);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.overlay-button {
  background-color: #444;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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

    .captured-video-container {
      position: absolute;
      bottom: 30px;
      right: 30px;
      z-index: 1000;

      video {
        border: 3px solid #fff;
      }
    }

    .recording,
    .download {
      background: none;
      color: $white;
      border: none;
      font-size: $body-font-size;
      margin-bottom: 12px;
      cursor: pointer;
    }

    .recording {
      font-size: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border: 4px solid rgb(255, 255, 255);
      border-radius: 100%;
      padding: 0;

      .circle {
        background-color: red;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5S ease-in-out;

        &.active {
          width: 50%;
          height: 50%;
          border-radius: 0;
        }
      }
    }

    .recording,
    .option,
    .download {
      cursor: pointer;
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