<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import type { Field, Sport, Schedule } from '@/typings/Field&Sport';
import useFieldStore from '@/store/FieldStore';

const route = useRoute();

const fieldStore = useFieldStore();

const fieldSelected = ref<Field | null>(null);
const sportSelected = ref<Sport | null>(null);

const sportId = route.params.sport;

onMounted(() => {
  const clubId = route.params.clubSelected;
  const sportId = route.params.sport;
  console.log(route.params)

  fieldSelected.value = fieldStore.fields.find((field: Field) => field.id === clubId) ?? null;
  sportSelected.value = fieldSelected.value?.sports.find((sport: Sport) => sport.id === sportId) ?? null;

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
          v-for="(field, index) in sportSelected.fields"
          :to="`${sportId}/schedule`"
          :key="index"
          class="container-cards-card-flag"
        >
          {{field.name}}
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
