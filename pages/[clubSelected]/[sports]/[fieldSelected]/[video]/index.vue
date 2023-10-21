<script setup>
import VideoCrazy from '@/components/Video.vue';
</script>

<template>
  <div>
    <p>
      aqui ira el video
    </p>
    <VideoCrazy
      video-url='https://storage.googleapis.com/videbox-bucket/video2023-08-28%2016-30-06%20CAM%201.mp4'
      :no-show-controls="true"
      :options="false" />
  </div>
</template>