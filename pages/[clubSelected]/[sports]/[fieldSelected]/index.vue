<script setup lang="ts">
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushButton from '@nabux-crush/crush-button';

import SelectInput from '@/components/SelectInput.vue'
import useClubStore from '@/store/clubStore';
import useUserStore from '@/store/userStore';

const useRunTimeConfig = useRuntimeConfig();

const route = useRoute();
const router = useRouter();

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
  return filteredSchedule.value?.map(video => {
    if(video.time) {
      let [hour, minute] = video.time.split(':');
      return `${hour}:${minute}`
    }
  }) || [];
});
const url = computed(() => {
  const videos = clubStore.clubs[0].sports[0].videos;

  const video = videos.find(v => {
    return v.field === route.params.fieldSelected &&
      v.date === selectedDate.value &&
      v.time.substring(0, 5) === selectedTime.value;
  });
  console.log(video)

  return video ? video.url : null;

});
const removeText = computed(() => !videoVisible.value )
const isAdmin = computed(() => userStore.user?.role?.includes('admin') ?? false);
const isLoggedIn = computed(() => userStore.user !== null);
const buttonTextForButton = computed(() => isAdmin.value ? 'Liberar video' : 'Buscar video');


function showVideo() {
  const redirectLink = `${route.params.fieldSelected}/${selectedDate.value}-${selectedTime.value}`
  if (isAdmin.value) {
    videoVisible.value = true;
  } else {
    router.push(redirectLink);
  }
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
    <p
      v-if="removeText" 
      class="schedule-flag">
      Selecciona la fecha y hora de tu partido
    </p>
    <video
      v-if="url && isAdmin"
      :src="url"
      controls
      class="video">
    </video>
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
      v-if="allFieldsSelected"
      :text="buttonTextForButton"
      @click="showVideo"
      class="button">
    </CrushButton>
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
  .video {
    width: 50%;
    @media (max-width: $tablet-lower-breakpoint) {
      width: 100%;
    }
  }
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
      .videocrazy {
        width: 100%;
        max-width: $tablet-lower-breakpoint;
      }
      &.blurred .videocrazy {
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
    padding: 12px;
    text-decoration: none;
    border-radius: 8px;
  }
  
}
</style>