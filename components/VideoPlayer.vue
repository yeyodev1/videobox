<script setup lang="ts">
import axios from 'axios';

const props = defineProps({
  videoURL: {
    type: String,
    required: true,
  },
});

const videoPlayer = ref(null)
const chunkSize = 15 * 1024 * 1024;
const videoKey = ref(0)

async function loadVideoInChunks() {
  if (!videoPlayer.value) {
    return;
  }
  const video = videoPlayer?.value as HTMLVideoElement;

  console.log(video);

  const videoURL = props.videoURL;
  const totalSize = videoURL.length;

  for (let start = 0; start < totalSize; start += chunkSize) {
    const end = Math.min(start + chunkSize, totalSize);
    const chunkURL = videoURL.slice(start, end);
    const response = await axios.get(chunkURL);
    console.log(response);
    const blob = await response.data; // Usar response.data para obtener el blob
    const objectURL = URL.createObjectURL(blob);
    video.src = objectURL;
    video.load(); // Asegurarse de cargar el nuevo fragmento en el reproductor
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

onMounted(() => {
  loadVideoInChunks();
})
</script>

<template>
  <div>
    <video ref="videoPlayer" controls></video>
  </div>
</template>