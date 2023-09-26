<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="card">
    <img 
      :src="image" 
      :alt="name"
      class="card-image">
    <p class="card-name">
      {{ name }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 8px;
  width: 100%;
  border: 1px solid $white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  @media (min-width: $tablet-lower-breakpoint) {
    width: 40%;
  }
  &-image {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: 160px;
  }
  &-name {
    font-size: $body-font-size;
    text-transform: capitalize;
  }
}
</style>