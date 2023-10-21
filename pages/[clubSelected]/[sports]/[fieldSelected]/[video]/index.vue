<script setup>
import VideoCrazy from '@/components/Video.vue';
</script>

<!-- video-url='https://storage.googleapis.com/videbox-bucket/video2023-08-28%2016-30-06%20CAM%201.mp4' -->
<template>
  <div>
    <p>
      aqui ira el video
    </p>
    <VideoCrazy
      video-url="https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4"
      :no-show-controls="true"
      :options="false" />
  </div>
</template>