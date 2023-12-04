<script setup lang="ts">
import useUserStore from '@/store/userStore';
import { parseVideoName } from '@/utils/videoParser';
import { VideoInput } from '@/typings/VideoTypes';

const userStore = useUserStore();

const router = useRouter();

const isLogged  = computed(() => userStore.user !== null);

function setLink(video: VideoInput): string {
  const parsedVideo = parseVideoName(video);
  if (!parsedVideo) {
    console.error('Error parsing video input:', video);
    return '#'; 
  }
  const clubPart = encodeURIComponent(parsedVideo.club);
  const sportPart = encodeURIComponent(parsedVideo.sport);
  const fieldPart = encodeURIComponent(parsedVideo.field);
  const videoIdPart = encodeURIComponent(parsedVideo.id);
  return `/${clubPart}/${sportPart}/${fieldPart}/${videoIdPart}`;
}
function setDate(name: VideoInput): string {
  const video = parseVideoName(name);
  return video?.date!;
}

onMounted(() => {
  if (!isLogged.value) {
    router.push('/userRegister')
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