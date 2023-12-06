<script setup lang="ts">
import useUserStore from '@/store/userStore';
import { parseVideoName } from '@/utils/videoParser';
import { ParsedVideo, VideoInput } from '@/typings/VideoTypes';

const userStore = useUserStore();
const router = useRouter();
const isLogged = computed(() => userStore.user !== null);
const processedVideos = computed(() => {
  return userStore.user?.videos.map(videoInput => {
    const parsed = parseVideoName(videoInput);
    return parsed ? { ...videoInput, ...parsed } : null;
  }).filter(video => video !== null) as ParsedVideo[];
});

function setLink(video: ParsedVideo): string {
  const clubPart = encodeURIComponent(video.club);
  const sportPart = encodeURIComponent(video.sport);
  const fieldPart = encodeURIComponent(video.field);
  const videoIdPart = encodeURIComponent(video.id);
  return `/${clubPart}/${sportPart}/${fieldPart}/${videoIdPart}`;
}

onMounted(() => {
  if (!isLogged.value) {
    router.push('/userRegister');
  }
});
</script>

<template>
  <div class="container">
    <p class="container-title">
      Estos son tus juegos 
    </p>
    <div class="container-games">
      <GameCard
        v-for="(video, index) in processedVideos"
        :key="index"
        :link="setLink(video)" 
        :date="video.date" 
        :club="video.club" 
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