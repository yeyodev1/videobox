<script setup lang="ts">
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushButton from '@nabux-crush/crush-button';

import SelectInput from '@/components/SelectInput.vue'
import useClubStore from '@/store/clubStore';
import useUserStore from '@/store/userStore';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const clubStore = useClubStore();

const apiKey = ref(0);
const selectedTime = ref('');
const selectedDate = ref('');
const videoId = ref('');
const email = ref('');
const videoVisible = ref(false);
const success = ref(false);
const clubId = ref(route.params.clubSelected as string);
const fieldId = ref(route.params.fieldSelected as string);
const sportId = ref(route.params.sports as string);
const clubSelected = computed(() => {
  const club = clubStore.clubs[clubId.value];
  return club;
});
const sportSelected = computed(() => {
  const sport = clubSelected.value?.sports[sportId.value];
  return sport;
});
const fieldSelected = computed(() => {
  const field = sportSelected.value?.fields[fieldId.value];
  return field;
});

const allFieldsSelected = computed(() => {
  return selectedDate.value !== '' && selectedTime.value !== '';
});
const optionsDay = computed(() => {
  if (!fieldSelected.value) return [];
  const dates = Object.keys(fieldSelected.value.dates);
  return dates;
});
const optionsSchedule = computed(() => {
  if (!fieldSelected.value || !selectedDate.value) return [];
  const times = fieldSelected.value.dates[selectedDate.value]
    ? Object.keys(fieldSelected.value.dates[selectedDate.value])
    : [];

  return times;
});
const url = computed(() => {
  if (!selectedDate.value || !selectedTime.value || !fieldSelected.value) {    
    return null;
  }
  const timeslotVideos = fieldSelected.value.dates[selectedDate.value][selectedTime.value];

  if (!timeslotVideos || timeslotVideos.length === 0) {    
    return null;
  }

  const video = timeslotVideos[0]; 

  videoId.value = video.id; 
  return video.url;
});

const removeText = computed(() => !videoVisible.value )
const isAdmin = computed(() => userStore.user?.role?.includes('admin') ?? false);
const buttonTextForButton = computed(() => isAdmin.value ? 'Liberar video' : 'Buscar video');
const showMessage = computed(() => success.value && !clubStore.errorMessage);
async function showVideo() {
  try {
    if (isAdmin.value && videoId.value) {
      clubStore.releaseVideo(email.value, videoId.value);
      success.value = true;
    } else if (videoId.value) {
      const redirectLink = `${route.params.fieldSelected}/${videoId.value}`;
      router.push(redirectLink);
    } else {
      console.error("No se ha seleccionado ningún video");
    }
    email.value = '';
    selectedDate.value = '';
    selectedTime.value = '';
    apiKey.value++;
    setTimeout(() => success.value = false, 4000);
  } catch (error) {
    console.error(error);
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

onMounted(async () => {
  if (Object.keys(clubStore.clubs).length === 0) {
    
    await clubStore.getVideos();
  }
});
</script>

<template>
  <div class="schedule"> 
    <p class="schedule-title">
      Tus partidos en HD
    </p>
    <p
      v-if="removeText" 
      class="schedule-flag">
      Selecciona la fecha y hora de tu partido
    </p>
    <span 
        v-if="showMessage"
        class="success">
        *Video liberado*
      </span>
    <video
      v-if="url && isAdmin"
      :src="url"
      controls
      class="video">
    </video>
    <div class="schedule-container">
      <SelectInput
        :key="apiKey"
        :options="optionsDay"
        :value="selectedDate"
        label="Escoge el día"
        @update:value="handleInput($event, 'day')"
        >
      </SelectInput>
      <SelectInput
        :key="apiKey"
        :options="optionsSchedule"
        :value="selectedTime"
        label="Escoge la hora"
        @update:value="handleInput($event, 'time')">
      </SelectInput>
      <CrushTextField
        v-if="isAdmin"
        v-model="email"
        :key="apiKey"
        label="Ingresa el correo electronico"
        class="schedule-email" />
      <span 
        v-if="clubStore.errorMessage"
        class="warning">
        *{{ clubStore.errorMessage }}*
      </span>
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
  .success {
    color: $green;
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
    .warning {
      color: $red;
    }
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