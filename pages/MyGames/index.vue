<script setup lang="ts">
import useUserStore from '@/store/userStore';
import { parseVideoName } from '@/utils/videoParser';
import { VideoInput } from '@/typings/VideoTypes';

const userStore = useUserStore();

const router = useRouter();

const isLogged  = computed(() => userStore.user !== null);

onMounted(() => {
  if (!isLogged.value) {
    router.push('/userRegister')
  }
});

function setLink(name: VideoInput): string {
  const video = parseVideoName(name);
  const formattedTime = video?.time.substring(0, 5);
  return `/one-padel/padel-1/${video?.field}/${video?.id}`
}

function setDate(name: VideoInput): string {
  const video = parseVideoName(name);
  return video?.date!;
}
</script>

<template>
  <div class="container">
    <p class="container-title">
      Estos son tus juegos 
    </p>
    <div class="container-games">
      <GameCard
        v-for="(video, index) in userStore.user?.videos"
        :key="index"
        :link="setLink(video)"
        :date="setDate(video)"
        :video-url="video.url" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  &-title {
    font-family: $font;
    font-size: $h2-font-size;
    text-align: center;
  }
  &-games {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
}
</style>