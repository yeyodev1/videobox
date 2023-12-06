<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: false,
    default: 'tu partido'
  },
  videoUrl: {
    type: String,
    required: true
  },
  club: {
    type: String,
    required: true,
  }
})


</script>

<template>
  <div class="card">
    <NuxtLink :to="link" class="card-link">
      <video :src="videoUrl" poster="@/assets/videobox.png" class="video"></video>
      <p class="card-link-date">
        {{ club }} - {{ date }}
      </p>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: $mobile-lower-breakpoint;
  padding: 16px;
  border: 1px solid $purple;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
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
    .video {
      width: 100%;
      border-radius: 8px;
    }
    &-date {
      font-size: $body-font-size;
      text-align: center;
    }
  }
}
</style>