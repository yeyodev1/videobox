<script setup>
import axios from 'axios';

import VideoCrazy from '@/components/Video.vue';

const videoUrl = ref(null);

const fetchVideo = async () => {
  try {
    const response = await axios.get('https://storage.googleapis.com/videbox-bucket/video2023-08-28%2016-30-06%20CAM%201.mp4');

    if(!response.ok) {
      throw new Error (`Network response was not ok: ${response.statusText}`)
    };
    console.log(response)
    const blob = await response.blob();
    videoUrl.value = URL.createObjectURL(blob);
  } catch (error){
    console.log('hubo un problema con el fetcheo', error)
  }
}

onMounted(() => {
  fetchVideo();
})
</script>

<!-- video-url='https://storage.googleapis.com/videbox-bucket/video2023-08-28%2016-30-06%20CAM%201.mp4' -->
<template>
  <div>
    <p>
      aqui ira el video
    </p>
    <VideoCrazy
      :video-url="'https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4'"
      :no-show-controls="true"
      :options="false" />
  </div>
</template>