<script setup lang="ts">
import CrushButton from '@nabux-crush/crush-button';

import useClubStore from '@/store/clubStore';
import type { Club, Fields, Sport } from '@/typings/Field&Sport';

const sportSelected = ref<Sport | null>(null);
const clubSelected = ref<Club | null>(null);
const fieldSelected = ref<Fields | null>(null);
const selectedDay = ref<string | null>(null);
const selectedMonth = ref<string | null>(null);
const selectedTime = ref<string | null>(null);



const clubStore = useClubStore();
const route = useRoute();

onMounted(() => {
  console.log(route.params);
  const clubId = route.params.clubSelected;
  const sportId = route.params.sports ;
  const fieldId = route.params.fieldSelected;

  console.log('field selected', fieldId)
  console.log('sportId', sportId)
  console.log('clubId', clubId)

  clubSelected.value = clubStore.clubs.find((club: Club) => club.id === clubId) ?? null;
  sportSelected.value = clubSelected.value?.sports.find((sport: Sport) => sport.id === sportId) ?? null;
  fieldSelected.value = sportSelected.value?.fields.find((field: Fields) => field.id === fieldId);
});

const allFieldsSelected = computed(() => {
  return selectedDay.value !== null && selectedMonth.value !== null && selectedTime.value !== null;
});


</script>

<template>
  <div class="schedule"> 
    <p class="schedule-title">
      Disfruta de tus mejores jugadas en HD
    </p>
    <p class="schedule-flag">
      Selecciona el horario de tu jugada
    </p>
    <div class="schedule-container">
      <p class="schedule-container-question">Elige el día</p>
      <select 
        name="days" 
        class="schedule-select"
        v-model="selectedDay">
        <option value="" disabled selected>Seleccionar</option>
        <option 
          v-for="(scheduleItem, index) in fieldSelected?.schedule || []" 
          :key="index" 
          :value="`day${index}`">
          {{ scheduleItem.day }}
        </option>
      </select>
      <p class="schedule-container-question">Elige el mes</p>
      <select 
        name="days" 
        class="schedule-select"
        v-model="selectedMonth">
        <option value="" disabled selected>Seleccionar</option>
        <option 
          v-for="(scheduleItem, index) in fieldSelected?.schedule || []" 
          :key="index" 
          :value="`day${index}`">
          {{ scheduleItem.month }}
        </option>
      </select>
      <p class="schedule-container-question">Elige el horario</p>
      <select 
        name="days" 
        class="schedule-select"
        v-model="selectedTime">
        <option value="" disabled selected>Seleccionar</option>
        <option 
          v-for="(scheduleItem, index) in fieldSelected?.schedule || []" 
          :key="index" 
          :value="`day${index}`">
          desde {{ scheduleItem.startHour }} hasta {{ scheduleItem.endHour }}
        </option>
      </select>
    </div>
    <CrushButton
      varian="primary"
      text="Buscar video" 
      :disabled="!allFieldsSelected"/>
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  &-title {
    font-size: $h1-font-size;
    text-align: center;
  }
  &-flag {
    font-size: $h3-font-size;
    font-weight: 700;
  }
  &-container {
    width: 100%;
    max-width: $mobile-lower-breakpoint;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 24px;
    border-radius: 8px;
    gap: 12px;
    &-question {
      font-size: $body-font-size;
    }
  }
  &-select {
    padding: 12px;
    background-color: $dark-purple;
    border: 1px solid $purple;
    color: $white; 
    border-radius: 4px; 
    font-size: $body-font-size; 
    appearance: none; 
    -webkit-appearance: none;
    -moz-appearance: none; 
    cursor: pointer;
  }
  :deep(.crush-primary) {
    background-color: $grey;
    border: none;
    color: $white;
  &:hover {
    background-color: $purple;
    border: none;
  }
  }
}
</style>