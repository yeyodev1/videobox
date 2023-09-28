<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import type { Field, Sport } from '@/typings/Field&Sport';
import useFieldStore from '@/store/FieldStore';



const fieldStore = useFieldStore();
const route = useRoute();
const fieldSelected = ref<Field | null>(null);
const sportSelected = ref<Sport | null>(null);

onMounted(() => {
  const clubId = route.params.clubSelected;
  const sportId = route.params.sport;
  fieldSelected.value = fieldStore.fields.find((field: Field) => field.id === clubId) ?? null;
  sportSelected.value = fieldSelected.value?.sports.find((sport: Sport) => sport.id === sportId) ?? null;
  console.log(sportSelected.value)
});
</script>

<template>
  <div 
    class="container" >
    <h2 class="container-title">
      Estos son los horarios que hay
    </h2>
    <div class="container-cards">
      <div 
      v-if="sportSelected"
      class="container-cards-card" >
      <NuxtLink
        to=""
        v-for="(schedule, index) in sportSelected.schedule"
        :key="index"
        class="container-cards-card-flag">
        Desde {{schedule.startHour}} hasta {{schedule.endHour}} 
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
      }
    }
  }
}
</style>
