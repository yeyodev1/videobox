<script setup>
import 'video.js/dist/video-js.css'
import videojs from 'video.js';

import useUserStore from '@/store/userStore';

const userStore = useUserStore();

const { videoUrl, noShowControls, options } = defineProps(['videoUrl', 'noShowControls', 'options']);

const emit = defineEmits(['update:time'])

const videoEl = ref(null);
const mediaRecorder = ref(null);
const recordedChunks = ref([]);
const recordedBlob = ref(null);
const isRecording = ref(false);
const isDownloaded = ref(false);
const timeBlur = ref(false);

const isLoggedIn = computed(() => userStore.user !== null);
const isAdmin = computed(() => userStore.user?.role?.includes('admin') ?? false);
const linkDestination = computed(() => isLoggedIn.value ? `/purchase` : '/userRegister');
const videoPurchased = computed(() => {
  const video = userStore.user.videos.find(video => video.url === videoUrl);
  return video ? true : false;
});
const isBlurred = computed(() => {
  return timeBlur.value || (
    !isAdmin.value && 
    (!isLoggedIn.value || (videoPurchased.value && isLoggedIn.value))
  );
});
const buttonText = computed(() => isLoggedIn.value ? 'Compra aquí tu jugada' : 'Crea una vuenta')

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
    recordedBlob.value = new Blob(recordedChunks.value, { type: 'video/mp4' });
  };
  mediaRecorder.value.onerror = (event) => {
    console.error('MediaRecorder error:', event.error);
  };
  mediaRecorder.value.start();
  isRecording.value = true;
};

function stopRecording() {
  mediaRecorder.value.stop();
  isRecording.value = false;
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
  a.download = 'recording.mp4';
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
  if(video.currentTime >= 15) {
    timeBlur.value = true;
    videoEl.value.pause();
  }
};
function toggleBlur() {
  isBlurred.value = !isBlurred.value;
}


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
      <video 
        playsinline 
        ref="videoEl" 
        crossorigin="anonymous" 
        :class="{ blurred: isBlurred || timeBlur }"
        class="video-js video" 
        />
        <div v-if="isBlurred" class="overlay">
          <button class="overlay-button">
            Para ver lo demás, <NuxtLink :to="linkDestination"> {{ buttonText }} </NuxtLink> 
          </button>
        </div>
      <div class="buttons-center-bottom">
        <button v-if="!recordedBlob" @click="toggleRecording" class="recording">
          🔴
        </button>
        <button v-if="recordedBlob && !isDownloaded" @click="downloadRecording" @touchend="downloadRecording" class="download">
          Descargar
        </button>
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
    .recording, .option, .download {
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
