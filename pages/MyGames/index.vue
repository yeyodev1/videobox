<script setup>
import useUserStore from '@/store/userStore';

const userStore = useUserStore();

const route = useRoute();

const mygames = route.path;

const isLogged  = computed(() => userStore.user !== null);

onMounted(() => {
  if(!isLogged.value) {
    route.push('/userRegister')
  }
})
</script>

<template>
  <div class="container">
    <p class="container-title">
      Estos son tus juegos 
    </p>
    <div class="container-games">
      <GameCard 
        :link="`${mygames}/soybello`"
        date="1 de enero"/>
      <GameCard 
        :link="`${mygames}/soybello`"
        date="1 de enero"/>
      <GameCard 
        :link="`${mygames}/soybello`"
        date="1 de enero"/>
      <GameCard 
        :link="`${mygames}/soybello`"
        date="1 de enero"/>
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