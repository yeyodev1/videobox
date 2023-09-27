<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true
  }
});

// const route = useRoute();
// const isWatchField = computed(() => {
//   return route.path === `${props.id}`;
// });
// const routeDirection = computed(() => {
//   return isWatchField.value ? '' : `${props.id}`; 
// });

</script>

<template>
  <NuxtLink 
    :to="id"
    class="link">
    <div class="card">
    <img 
      :src="image" 
      :alt="name"
      class="card-image">
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
  }
  .card {
  padding: 8px;
  width: 100%;
  border: 1px solid $white;
  border-radius: 8px;
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
}
</style>