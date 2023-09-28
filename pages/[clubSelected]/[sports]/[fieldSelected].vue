<script setup lang="ts">
import useClubStore from '@/store/clubStore';
import type { Club, Sport, Fields, Schedule } from '@/typings/Field&Sport';

const sportSelected = ref<Sport | null>(null);
const clubSelected = ref<Club | null>(null);


const clubStore = useClubStore();
const route = useRoute();

onMounted(() => {
  const scheduleId = route.params.schedule;
  const sportId = route.params.sport;
  console.log('route params', route.params)

  clubSelected.value = clubStore.clubs.find((club: Club) => club.id === scheduleId) ?? null;
  sportSelected.value = clubSelected.value?.sports.find((sport: Sport) => sport.id === sportId) ?? null;

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
      <select name="days" class="schedule-select">
        <option value="" disabled selected>Seleccionar</option>
        <option value="miercoles2">Miércoles 2</option>
        <option value="jueves3">Jueves 3</option>
        <option value="viernes4">Viernes 4</option>
        <option value="viernes5">Viernes 5</option>
      </select>
    </div>
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
    border: 1px solid $purple;
    border-radius: 8px;
    gap: 12px;
    &-question {
      font-size: $body-font-size;
    }
  }
  &-select {
    padding: 13px;
    background-color: $dark-purple;
    color: $white; 
    border: none; 
    border-radius: 4px; 
    font-size: $body-font-size; 
    appearance: none; 
    -webkit-appearance: none;
    -moz-appearance: none; 
    cursor: pointer;
    &:focus-visible {
      outline: none;
    }
  }
}
</style>