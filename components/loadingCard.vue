<script setup>
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
  if (props.videoUrl) {
    // Crear un elemento <a> usando document.createElement
    const a = document.createElement('a');
    // Asignar propiedades al enlace para la descarga
    a.download = 'video'; // Aquí puedes especificar el nombre del archivo con su extensión
    a.href = props.videoUrl;
    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(a);
    // Disparar el evento de clic en el enlace
    a.click();
    // Eliminar el enlace del cuerpo del documento
    document.body.removeChild(a);
  }
};
</script>

<template>
  <div class="card">
    <p v-if="isLoading">{{ message }}</p>
    <div v-else>
      <p>{{secondMessage}}</p>
      <a
        :href="videoUrl"
        download="video.mp4"
        class="boton">
        descargar
      </a>
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
