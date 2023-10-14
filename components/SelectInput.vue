<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['update:value'])

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const optionSelected = ref(props.value);

const emitValue = () => {
  optionSelected.value = optionSelected.value.trim();
  emit('update:value', optionSelected.value);
};

watch(optionSelected, () => {
  emitValue();
});
</script>

<template>
  <label class="form-container-label">
    {{ label }}
    <select
      v-model="optionSelected"
      class="form-container-label-select">
      <option
        disabled
        selected
        class="custom-option">
        Escoge aquí
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        class="custom-option">
        {{ option }}
      </option>
    </select>
  </label>
</template>

<style lang="scss" scoped>
.form-container-label {
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  color: $white;
  gap: 12px;
  font-weight: bold;
  margin-bottom: 1rem;
  &-select {
    font-family: $font;
    font-weight: 500;
    color: $white;
    background-color: $dark-purple;
    appearance: none;
    outline: none;
    border: 1px solid $purple;
    padding: 8px;
    border-radius: 8px;
    .custom-option {
      background: transparent;
      color: $white;
      font-family: $font;
    }
  }
}
</style>