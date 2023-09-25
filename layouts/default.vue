<script setup lang="ts">
import TheHeader from '@/layouts/web/TheHeader.vue'
import TheMenu from './web/TheMenu.vue';
import TheFooter from './web/TheFooter.vue';

const showWebMenu = ref(false);

const toggleShowMenu = () => {
  showWebMenu.value = !showWebMenu.value;
};
</script>

<template>
  <div class="app-container">
    <TheHeader @toggle-menu="toggleShowMenu"/>
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