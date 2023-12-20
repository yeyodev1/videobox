<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: true
  }
});
</script>

<template>
  <NuxtLink 
    :to="id"
    class="link">
    <div class="card">
      <img
        v-if="image" 
        class="card-image" 
        :src="image" 
        :alt="name">
      <p class="card-name">
        {{ name }}
      </p>
  </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.link {
  width: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  @media (min-width: $tablet-lower-breakpoint) {
    width: 40%;
    max-width: 500px;
  }
  .card {
  padding: 8px;
  width: 100%;
  border: 1px solid $white;
  border-radius: 8px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05); 
  }
  &-image {
    width: 100%;
    height: 204px;
    object-fit: cover;
  }
  &-name {
    font-size: $body-font-size;
    text-transform: capitalize;
    text-align: center;
  }
}
}
</style>