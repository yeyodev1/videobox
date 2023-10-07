<script setup lang="ts">
import TheHeaderUser from '@/layouts/userRegister/Header.vue';
import TheHeader from '@/layouts/web/TheHeader.vue'
import TheFooter from './web/TheFooter.vue';
import TheMenu from './web/TheMenu.vue';

import { useUserStore } from '@/store/userStore';

const showWebMenu = ref(false);

const userStore = useUserStore();

const isUserLoggedIn = computed(() => userStore.user !== null);

const toggleShowMenu = () => {
  showWebMenu.value = !showWebMenu.value;
};
</script>

<template>
  <div class="app-container">
    <TheHeaderUser 
      v-if="isUserLoggedIn" />
    <TheHeader 
      v-else
      @toggle-menu="toggleShowMenu"/>
    <TheMenu
      :isVisible="showWebMenu"  
      @toggle-menu="toggleShowMenu"/>
    <div class="app-container-view">
      <slot  />
    </div>
    <TheFooter  />
  </div>
</template>

<style lang="scss">
.app-container {
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	&-view{
		flex: 1;
	}
}
</style>