<script setup lang="ts">
import { useRoute } from 'vue-router';

import type { Club } from '~/typings/Field&Sport';
import useClubStore from '@/store/clubStore';

const route = useRoute();

const clubStore = useClubStore();

const clubSelected = ref<Club | null>(null);

const sportsForSelectedClub = computed(() => {
  return clubSelected.value ? clubSelected.value.sports : [];
});

onMounted(() => {
  const clubId = route.params.club
  clubSelected.value = clubStore.clubs.find((club: Club) => club.id === clubId) ?? null;
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
        :image="sport.image"
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
