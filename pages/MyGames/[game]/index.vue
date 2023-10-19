<script setup>
import VideoCrazy from '@/components/Video.vue';

</script>

<template>
  <div class="container">
    <p class="container-title">
      Aquí esta tu partido
    </p>
    <div class="container-video">
      <VideoCrazy
        :video-url="'https://v3.cdnpk.net/videvo_files/video/free/video0485/large_watermarked/_import_624e701eba64a0.34411893_preview.mp4'"
        :no-show-controls="true"
        :options="false"
        class="videocrazy"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 24px;
  &-title {
    color: $white;
    font-size: $body-font-size;
  }
  &-video {
    width: 100%;
    .videocrazy {
        width: 100%;
        max-width: $tablet-lower-breakpoint;
      }
  }
}
</style>