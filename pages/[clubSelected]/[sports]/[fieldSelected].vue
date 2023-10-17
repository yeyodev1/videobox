<script setup lang="ts">
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushButton from '@nabux-crush/crush-button';

import SelectInput from '@/components/SelectInput.vue'
import useClubStore from '@/store/clubStore';
import useUserStore from '@/store/userStore';

const useRunTimeConfig = useRuntimeConfig();

const route = useRoute();

const userStore = useUserStore();
const clubStore = useClubStore();

const selectedDate = ref('');
const selectedTime = ref('');
const videoVisible = ref(false);
const showMessage = ref(false);


const filteredSchedule = computed(() => {
  const fieldFromRoute = route.params.fieldSelected;

  if (clubStore.clubs[0].sports[0].videos && clubStore.clubs[0].sports[0].videos.length > 0) {
    return clubStore.clubs[0].sports[0].videos.filter(video => 
      video && video.time && video.field &&
      video.field === fieldFromRoute 
    );
  }
  return [];
});
const allFieldsSelected = computed(() => {
  return selectedDate.value !== '' && selectedTime.value !== '';
});
const optionDays = computed(() => {
  const fieldFromRoute = route.params.fieldSelected;
  
  return clubStore.clubs[0].sports[0].videos
    ?.filter(video => video.field === fieldFromRoute)
    .map(video => video.date);
});
const optionsSchedule = computed(() => {
  return filteredSchedule.value?.map(video => video.time) || [];
});
const videoLink = computed(() => {
  const matchedVideo = clubStore.clubs[0].sports[0].videos.find(video => video.field === route.params.fieldSelected)

  const fileId = matchedVideo ? matchedVideo.directLink : '';

  return `https://www.googleapis.com/drive/v3/files/${fileId}?key=${useRunTimeConfig.public.NUXT_API_KEY}&alt=media`;
})
const isAdmin = computed(() => userStore.user?.role?.includes('admin') ?? false);
const isLoggedIn = computed(() => userStore.user !== null);
const linkDestination = computed(() => isLoggedIn.value ? `/purchase` : '/userRegister')
const buttonText = computed(() => isLoggedIn.value ? 'Compra aquí tu jugada' : 'Crea una vuenta')

function handleTimeUpdate(event: Event) {
  const video = event.target as HTMLVideoElement;
  if(!isAdmin.value) {
    if(video.currentTime>=10) {
      video.pause();
      showMessage.value = true;
    }
  }
};

function showVideo() {
  videoVisible.value = true;
};

function handleInput(event: string, type: string): void {
  if(type === 'day') {
    selectedDate.value = event
  }
  if(type === 'time') {
    selectedTime.value = event
  }
}
</script>

<template>
  <div class="schedule"> 
    <p class="schedule-title">
      Disfruta de tus mejores jugadas en HD
    </p>
    <p class="schedule-flag">
      Selecciona el horario de tu jugada
    </p>
    <div 
      v-if="videoVisible" 
      class="schedule-container-video"
      :class="{ blurred: showMessage }">
      <!-- <video controls @timeupdate="handleTimeUpdate">
        <source 
          :src="videoLink" 
          type="video/mp4">
          Tu navegador no soporta la etiqueta de video de HTML5.
      </video> -->
      <VideoPlayer :videoURL="videoLink" />
      <NuxtLink
        :to="linkDestination"
        v-if="showMessage" 
        class="overlay-message">
        <span class="overlay-message-span">{{ buttonText }}</span> para ver lo demás
      </NuxtLink>
    </div>
    <div class="schedule-container">
      <SelectInput
        :options="optionDays"
        :value="selectedDate"
        label="Escoge el día"
        @update:value="handleInput($event, 'day')"
        >
      </SelectInput>
      <SelectInput
        :options="optionsSchedule"
        :value="selectedTime"
        label="Escoge la hora"
        @update:value="handleInput($event, 'time')">
      </SelectInput>
      <CrushTextField
        v-if="isAdmin"
        label="Ingresa el correo electronico"
        class="schedule-email"/>
    </div>
    <CrushButton
      varian="primary"
      text="Buscar video" 
      :disabled="!allFieldsSelected"
      @click="showVideo"
      class="button"/>
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  &-title {
    font-size: $h1-font-size;
    text-align: center;
  }
  &-flag {
    font-size: $h3-font-size;
    font-weight: 700;
  }
  &-container {
    width: 100%;
    max-width: $tablet-upper-breakpoint;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 24px;
    border-radius: 8px;
    gap: 12px;
    &-video {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      video {
        width: 100%;
        max-width: $tablet-lower-breakpoint;
      }
      &.blurred video {
        filter: blur(5px);
      }
      .overlay-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);
        padding: 20px;
        border-radius: 5px;
        color: white;
        text-align: center;
        text-decoration: none;
        &-span {
          text-decoration: underline;
        }
      }
    }
    &-question {
      font-size: $body-font-size;
    }
    :deep(.crush-text-field .input-container) {
      border: 1px solid $purple;
    }  
  }
  .button {
    background-color: $purple;
    color: $white;
    font-family: $font;
    border: none;
  }
  
}
</style>