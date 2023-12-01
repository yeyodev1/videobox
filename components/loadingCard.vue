<script setup>
import axios from 'axios';
import CrushButton from '@nabux-crush/crush-button';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    default: 'Tu video se está preparando...'
  },
  secondMessage: {
    type: String,
    default: 'Descárgalo ahora'
  },
  videoUrl: {
    type: String,
    required: false,
    default: ''
  }
});
const dataLoading = computed(() => props.videoUrl.length > 0);

function triggerDownload() {
  axios.get(props.videoUrl, {
    responseType: 'blob'
  })
  .then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'video.mp4');
    document.body.appendChild(link);
    link.click();
  })
  .catch(error => {
    console.error(error); 
  });
}
</script>

<template>
  <div class="card">
    <p v-if="isLoading">{{ message }}</p>
    <div 
      v-else
      class="card-container">
      <p>{{secondMessage}}</p>
      <CrushButton
        :dataLoading="!dataLoading"
        text="Descargar"
        @click="triggerDownload"
        class="boton" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 24px 0;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: $white;
  padding: 24px;
  &-container {
    display:  flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    .boton {
      background-color: $purple;
      color: $white;
      border: none;
      &:hover {
        background-color: darken($purple, 15%);
      }
    }
  }
  p {
    color: $black;
    font-size: $body-font-size;
  }
  a {
    color: black;
  }
}
</style>
