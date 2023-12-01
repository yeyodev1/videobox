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
    default: 'Tu video se está preparando...'
  },
  videoUrl: {
    type: String,
    required: false,
    default: ''
  }
});

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
    <div v-else>
      <p>{{secondMessage}}</p>
      <CrushButton
        text="Descargar"
        @click="triggerDownload"
        class="boton" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: $white;
  padding: 24px;
  p {
    color: $black;
    font-size: $body-font-size;
  }
  a {
    color: black;
  }
}
</style>
