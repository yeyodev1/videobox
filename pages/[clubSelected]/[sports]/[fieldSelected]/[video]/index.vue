<script setup lang="ts">
import VideoCrazy from '@/components/Video.vue';

import useClubStore from '~/store/clubStore';

const route = useRoute();

const clubStore = useClubStore();

// const url = ref<string | null>('');

const url = computed(() => {
  const routeParams = route.params;
  const videos = clubStore.clubs[0].sports[0].videos;

  if (typeof routeParams.video === 'string') {
    const videoSelected = routeParams.video.split('-');
    const date = videoSelected.slice(0, 3).join('-');
    const time = videoSelected[3];
  
    const video = videos.find(v => {
      console.log(v.field, routeParams.fieldSelected, v.date, date, v.time, time);
      return v.field === routeParams.fieldSelected &&
            v.date === date &&
            v.time.substring(0, 5) === time;
    });
  
    return video ? video.url : null;
  }
  return null;
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