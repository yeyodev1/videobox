<script setup lang="ts">
import useClubStore from '@/store/clubStore'


const clubStore = useClubStore();
</script>

<template>
  <div class="container">
    <h2 class="container-title">
      Tus partidos en HD
    </h2>
    <p class="container-question">
      ¿En dónde jugaste?
    </p>
    <div class="container-cards">
      <FieldSportCard
        v-for="(field, index) in clubStore.clubs"
        :key="index"
        :name="field.name"
        :image="field.image"
        :id="`${field.id}`"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  &-title {
    font-size: $h1-font-size;
    text-align: center;
  }
  &-question {
    font-size: $h2-font-size;
    text-align: center;
  }
  &-cards {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }
}
</style>