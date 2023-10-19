<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="card">
    <NuxtLink :to="link" class="card-link">
      <figure class="card-link-image">
        <img src="@/assets/padel.jpg" alt="Tu partido" class="image">
      </figure>
      <p class="card-link-date">
        {{ date }}
      </p>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: $mobile-lower-breakpoint;
  padding: 16px;
  &-link {
    text-decoration: none;
    &-image {
      border-radius: 8px;
      width: 100%;
      .image {
        width: 100%;
        border-radius: 8px;
        height: 360px;
      }
    }
    &-date {
      font-size: $body-font-size;
    }
  }
}
</style>