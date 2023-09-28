<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useClubStore from '@/store/clubStore';
import type { Club } from '~/typings/Field&Sport';

const clubStore = useClubStore();
const route = useRoute();
const clubSelected = ref<Club | null>(null);

onMounted(() => {
  const clubId = route.params.club
  clubSelected.value = clubStore.clubs.find((club: Club) => club.id === clubId) ?? null;
});
const fieldId = route.params.club


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
        :name="clubSelected.sports[0].name"
        :image="clubSelected.sports[0].image"
        :id="`${fieldId}/${clubSelected.sports[0].id}`" />
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
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
