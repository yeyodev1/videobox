<script setup lang="ts">
import { webMenuItems } from '@/utils/MenuItems';
import { computed } from 'vue';

const emit = defineEmits(['toggle-menu']);

const closeMenu = () => {
  emit('toggle-menu');
};

const props = defineProps({
  isVisible: Boolean
});


const menu = computed(() => webMenuItems )

</script>

<template>
  <transition name="slide-in-right">
    <div v-if="isVisible" class="container">
      <header>
        <figure>
          <img src="@/assets/videobox.png" alt="Predix">
        </figure>
        <button @click="closeMenu">
          <span>
            <i class="fa-solid fa-xmark" />
          </span>
        </button>
      </header>
      <div class="section">
        <RouterLink
          class="section-button"
          v-for="(button, index) in menu"
          :key="index"
          :to="button.link"
          @click="closeMenu"
        >
          {{ button.name }}
        </RouterLink>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  position: fixed;
  top: 0;
  right: 0; 
  height: 100vh;
  width: 100%;
  background-color: $dark-purple;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 10;
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    figure {
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    button {
      background: none;
      border: none;
      outline: none;
      color: $white;
      font-size: $h2-font-size;
    }
  }
  .section {
    padding: 24px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    &-button {
      width: 100%;
      color: $white;
      font-weight: 700;
      font-family: $font-secondary;
      font-size: $body-font-size;
      padding: 12px;
      border-bottom: 1px solid $white;
      text-decoration: none;
    }
  }
}

.slide-in-right-enter-active, .slide-in-right-leave-active {
  transition: right 0.5s;
}
.slide-in-right-enter, .slide-in-right-leave-to {
  right: -100%;
}
.slide-in-right-enter-from {
  right: -100%;
}
.slide-in-right-leave-to {
  right: -100%;
}
</style>