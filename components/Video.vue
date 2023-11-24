<script setup>
import 'video.js/dist/video-js.css'
import videojs from 'video.js';

import VideoService from '@/services/Videos/Videos'
import useUserStore from '@/store/userStore';

const videoService = new VideoService();

const route = useRoute();

const userStore = useUserStore();

const props = defineProps({
  videoUrl: {
    type: String,
    required: false,
    default: '',
  },
  noShowControls: {
    type: Boolean,
    default: false
  },
  options: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const emit = defineEmits(['update:time', 'captured-video'])

const videoEl = ref(null);
const timeBlur = ref(false);
const isRecordingActive = ref(false);
const player = ref(null);
const URL = ref(window.URL);
const selectionStart = ref(null);
const selectionEnd = ref(null);
const brightness = ref(100);
const contrast = ref(100);
const videoProcessingTask = ref({
  taskId: null,
  status: '',
  url: ''
});

const videoPurchased = computed(() => {
  const video = userStore.user.videos.find(video => video.url === props.videoUrl);
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
const isLoggedIn = computed(() => userStore.user !== null);
const isAdmin = computed(() => userStore.user?.role?.includes('admin') ?? false);
const linkDestination = computed(() => isLoggedIn.value ? `/purchase` : '/userRegister');

function secondsToHms(d) {
  d = Number(d);

  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

async function cutAndUploadVideo(start, end, videoId) {
  const formattedStart = secondsToHms(start);
  const formattedEnd = secondsToHms(end);

  console.log(`tiempo formateado para el corte: inicio: ${formattedStart}, fin ${formattedEnd}`)

  try {
    const response = await videoService.cutVideo(formattedStart, formattedEnd, videoId);
    const taskId = response.taskId;
    videoProcessingTask.value.taskId = taskId;
    videoProcessingTask.value.status = 'pending';
    console.log('id de tarea recibida: ', taskId);

    checkVideoStatus(taskId);
  } catch (error) {
    console.error('error al solicitar el corte del video: ', error);
  }
}

async function checkVideoStatus(taskId) {
  console.log(`sondeando el estado del video con id de tarea ${taskId}`);
  try {
    const response = await videoService.checkVideoStatus(taskId);
    videoProcessingTask.value.status = response.status;
    console.log('respuesta al verificar el estado: ', response);

    if (response.status === 'completed') {
      videoProcessingTask.value.url = response.url;
      console.log(`video procesado, url disponible: ${response.url}`);
      downloadVideo(response.url);
    } else if (response.status === 'pending') {
      console.log('el video aun esta en proceso, reintentando en 5 segundos...');
      setTimeout(() => checkVideoStatus(taskId), 5000);
    } else {
      alert('No pudimos descargar el video, inténtalo más tarde');
    }
  } catch (error) {
    console.error('error al verificar el estado del video: ', error);
    alert('No pudimos descargar el video, inténtalo más tarde');
  }
}


function handleSelection() {
  if (selectionStart.value === null) {
    selectionStart.value = player.value.currentTime();
    console.log(`Tiempo de inicio seleccionado: ${selectionStart.value}`);
    isRecordingActive.value = true;
  } else {
    selectionEnd.value = player.value.currentTime();
    console.log(`Tiempo de fin seleccionado: ${selectionEnd.value}`);
    console.log('videoid: ', route.params.video)
    cutAndUploadVideo(selectionStart.value, selectionEnd.value, route.params.video);
    selectionStart.value = null;
    selectionEnd.value = null;
    isRecordingActive.value = false;
  }
}

function downloadVideo(url) {
  if (url) {
    window.location.href = url
  } else {
    alert('No pudimos descargar el video, inténtalo más tarde')
  }
}

function increaseBrightness() {
  brightness.value += 50;
  alert('subiendo brillo')
  if (brightness.value > 200) brightness.value = 200;
};
function decreaseBrightness() {
  brightness.value -= 50;
  alert('bajando brillo')

  if (brightness.value < 0) brightness.value = 0;
};
function increaseContrast() {
  contrast.value += 50;
  alert('subiendo contaste')

  if (contrast.value > 200) contrast.value = 200;
};
function decreaseContrast() {
  contrast.value -= 50;
  alert('bajjando contaste')

  if (contrast.value < 0) contrast.value = 0;
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
    controls: props.noShowControls,
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
      src: props.videoUrl,
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
  <div class="container" :class="{ 'pointer-events-none': props.options }">
    <div class="container-video">
      <RouterLink 
        to="/"
        class="container-video-home">
        Regresa al home
      </RouterLink>
      <video 
        playsinline 
        ref="videoEl" 
        crossorigin="anonymous" 
        :style="{
          filter: `brightness(${brightness}%) contrast(${contrast}%)`,
          '-webkit-filter': `brightness(${brightness}%) contrast(${contrast}%)`
        }"
        :class="{ blurred: isBlurred && timeBlur }"
        class="video-js video" />
        <div v-if="isBlurred" class="overlay">
          <button class="overlay-button">
            <NuxtLink :to="linkDestination"> {{ buttonText }} </NuxtLink> 
          </button>
        </div>
      <div class="buttons-center-bottom">
        <button @click="handleSelection" class="recording" >
          <span class="circle" :class="{ 'active': isRecordingActive }"></span>
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
  &-home {
    position: absolute;
    padding: 16px;
    z-index: 5;
    text-decoration: none;
  }

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
    top: 10%;
    right: 10px;

    @media (min-width: $tablet-lower-breakpoint) {
      top: 40%;
    }

    .container-button-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      margin-bottom: 25px;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: 8px;
      border-radius: 8px;
      .container-button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        span {
          color: $purple;
          font-weight: 800;
        }
        i {
          color: $red;
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