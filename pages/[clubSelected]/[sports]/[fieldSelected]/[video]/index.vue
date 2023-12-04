<script setup lang="ts">
import VideoCrazy from '@/components/Video.vue';

import useClubStore from '~/store/clubStore';

const route = useRoute();

const clubStore = useClubStore();

const clubId = route.params.clubSelected as string;
const sportId = route.params.sports as string;
const fieldId = route.params.fieldSelected as string;
const videoId = route.params.video as string;

const url = computed(() => {
  let foundUrl = null;

  const clubs = clubStore.clubs;
  if (clubs[clubId] && clubs[clubId].sports[sportId] && clubs[clubId].sports[sportId].fields[fieldId]) {
    const dates = clubs[clubId].sports[sportId].fields[fieldId].dates;
    for (const date in dates) {
      for (const time in dates[date]) {
        const videos = dates[date][time];
        for (const video of videos) {
          if (video.id === videoId) {
            foundUrl = video.url;
            break;
          }
        }
        if (foundUrl) break;
      }
      if (foundUrl) break;
    }
  }
  return foundUrl;
});
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