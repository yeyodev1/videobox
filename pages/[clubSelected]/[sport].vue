<script setup lang="ts">
import { useRoute } from 'vue-router';

import type { Club, Sport } from '@/typings/Field&Sport';

import useClubStore from '@/store/clubStore';

const route = useRoute();

const clubStore = useClubStore();

const clubId = ref(route.params.clubSelected as string);
const sportId = ref(route.params.sport as string);
const clubSelected = ref<Club | null>(null);
const sportSelected = ref<Sport | null>(null);

const uniqueFields = computed(() => {
  if(!sportSelected.value) return [];
  const fields = sportSelected.value.fields;
  const uniqueFieldsKeys = Object.keys(fields);
  uniqueFieldsKeys.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
  return uniqueFieldsKeys;
})

onMounted(async () => {
  if(Object.keys(clubStore.clubs).length === 0) {
    await clubStore.getVideos();
  }

  clubSelected.value = clubStore.clubs[clubId.value];
  sportSelected.value = clubSelected.value?.sports[sportId.value];
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
          :key="index"
          :to="`${sportId}/${field}`"
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
