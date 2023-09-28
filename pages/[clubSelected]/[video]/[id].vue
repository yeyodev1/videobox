<template>
  <div class="video-player">
    <video controls>
      <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
      Tu navegador no soporta el elemento de video.
    </video>
  </div>
</template>

<style lang="scss" scoped>
.video-player {
  width: 100%;
  max-width: 500px;
}
video {
  width: 100%;
}
</style>