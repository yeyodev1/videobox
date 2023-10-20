<script setup>
import VideoCrazy from '@/components/Video.vue';
</script>

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