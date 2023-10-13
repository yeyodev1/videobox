<script setup lang="ts">
import { onMounted } from 'vue';
import useClubStore from './store/clubStore';

const clubStore = useClubStore();

onMounted(() => {
  if (!clubStore.videos) {
    clubStore.getVideos();
  }
})
</script>

<template>
  <div class=“app-container”>
    <NuxtLayout>
      <div class=“app-container-view”>
        <NuxtPage   />
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.app-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: $dark-purple;
  &-view{
    flex: 1;
  }
}
</style>