<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import useClubStore from '@/store/clubStore';

const route = useRoute();

const clubStore = useClubStore();

const clubId = ref(route.params.clubSelected);
const sportId = ref(route.params.sport);
const clubSelected = computed(() => {
  return clubStore.clubs.find(club => club.id === clubId.value);
});

const sportSelected = computed(() => {
  return clubSelected.value?.sports.find(sport => sport.id === sportId.value);
});
const uniqueFields = computed(() => {
  if (!sportSelected.value || !sportSelected.value.videos) return [];
  const fieldsSorted = sportSelected.value.videos
    .map(video => video.field)
    .map(field => {
      const match = field.match(/Cancha (\d+)/);
      return {
        field: field,
        number: match ? parseInt(match[1], 10) : 0
      };
    })
    .sort((a, b) => a.number - b.number)
    .map(sortedField => sortedField.field);

  return Array.from(new Set(fieldsSorted));
});

onMounted(async () => {
  if (sportSelected.value) {
    await clubStore.getVideos();
    const a = sportSelected.value.videos
    console.log(a)
  }
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
          v-for="(field, index) in uniqueFields"
          :to="`${sportId}/${field}`"
          :key="index"
          class="container-cards-card-flag"
        >
          {{field}}
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
