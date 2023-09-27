<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useFieldStore from '@/store/FieldStore';
import type { Field } from '~/typings/Field&Sport';

const fieldStore = useFieldStore();
const route = useRoute();
const fieldSelected = ref<Field | null>(null);

onMounted(() => {
  const fieldId = route.params.club
  fieldSelected.value = fieldStore.fields.find((field: Field) => field.id === fieldId) ?? null;
});
const fieldId = route.params.club


</script>

<template>
  <div 
    v-if="fieldSelected"
    class="container" >
    <h2 class="container-title">
      Estas en la seccion de {{ fieldSelected.name }}
    </h2>
    <div class="container-cards">
      <FieldSportCard
        :name="fieldSelected.sports[0].name"
        :image="fieldSelected.sports[0].image"
        :id="`${fieldId}/${fieldSelected.sports[0].id}`" />
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
  &-cards {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
