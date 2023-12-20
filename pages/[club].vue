<script setup lang="ts">
import { useRoute } from 'vue-router';

import type { Club, Sport } from '~/typings/Field&Sport';
import useClubStore from '@/store/clubStore';
import useUserStore from '~/store/userStore';

const route = useRoute();
const clubStore = useClubStore();
const userStore = useUserStore();
const clubSelected = ref<Club | undefined>();

const sportsForSelectedClub = computed(() => {
  return clubSelected.value ? Object.values(clubSelected.value.sports) : [];
});
const isAdmin = computed(() => userStore.user?.role?.includes('admin') ?? false);

onMounted(async () => {
  if (Object.keys(clubStore.clubs).length === 0) {
    if (!isAdmin.value) {
      await clubStore.getVideos();
    } else {
      await clubStore.getVideos(true);
    }
  }
  const clubId = route.params.club as string;
  clubSelected.value = clubStore.clubs[clubId];
}); 
</script>

<template>
  <div 
    v-if="clubSelected"
    class="container" >
    <h2 class="container-title">
      Presiona tu deporte del {{ clubSelected.name }}
    </h2>
    <div class="container-cards">
      <FieldSportCard
        v-for="sport in sportsForSelectedClub"
        :key="sport.id"
        :name="sport.name"
        :id="`${clubSelected.id}/${sport.id}`" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  padding: 24px;
  &-title {
    text-align: center;;
  }
  &-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 24px;
  }
}
</style>
