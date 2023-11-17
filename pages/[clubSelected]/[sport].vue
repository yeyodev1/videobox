<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import type { Club, Sport } from '@/typings/Field&Sport';
import useClubStore from '@/store/clubStore';
import { ParsedVideo } from '~/typings/VideoTypes';

const route = useRoute();

const clubStore = useClubStore();

const clubSelected = ref<Club | null>(null);
const sportSelected = ref<Sport | null>(null);

const sportId = route.params.sport;

const sortedVideos = computed(() => {
  console.log(clubStore.clubs[0].sports[0].videos)
  return clubStore.clubs[0].sports[0].videos.slice().sort((a: ParsedVideo, b: ParsedVideo) => {
    if (a.field < b.field) return -1;
    if (a.field > b.field) return 1;
    return 0;
  });
});

onMounted(() => {
  const clubId = route.params.clubSelected;
  const sportId = route.params.sport;

  clubSelected.value = clubStore.clubs.find((club: Club) => club.id === clubId) ?? null;
  sportSelected.value = clubSelected.value?.sports.find((sport: Sport) => sport.id === sportId) ?? null;
});
</script>

<template>
  <div class="container" >
    <h2 class="container-title">
      Escoge la cancha en la cual jugaste 
    </h2>
    <div class="container-cards">
      <div v-if="sportSelected" class="container-cards-card">
        <NuxtLink
          v-for="(field, index) in sortedVideos"
          :to="`${sportId}/${field.field}`"
          :key="index"
          class="container-cards-card-flag"
        >
          {{field.field}}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  &-title {
    text-align: center;
  }
  &-cards {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    &-card {
      width: 100%;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 55px;
      max-width: $tablet-upper-breakpoint;
      &-flag {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        background-color: $purple;
        margin: 0 auto;
        text-decoration: none;
      }
    }
  }
}
</style>
