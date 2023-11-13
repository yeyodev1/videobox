<script setup lang="ts">
import VideoCrazy from '@/components/Video.vue';

import useClubStore from '~/store/clubStore';

const route = useRoute();

const clubStore = useClubStore();

const url = computed(() => {
  const videoId = route.params.video;
  const video = clubStore.clubs[0].sports[0].videos.find(v => v.id === videoId);


  return video ? video.url : null;
})
</script>

<template>
  <div>
    <p>
      aqui ira el video
    </p>
    <VideoCrazy
      v-if="url?.length"
      :video-url="url"
      :no-show-controls="true"
      :options="false" />
  </div>
</template>