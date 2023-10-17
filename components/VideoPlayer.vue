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

async function loadVideoInChunks() {
  if (!videoPlayer.value) {
    return;
  }
  const video = videoPlayer?.value as HTMLVideoElement;
  let start = 0;

  console.log(video)

  while (start < props.videoURL.length) {
    const end = Math.min(start + chunkSize, props.videoURL.length);
    const chunkURL = props.videoURL.slice(start, end);
    const response = await axios.get(chunkURL);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    video.src = objectURL;
    start = end;
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