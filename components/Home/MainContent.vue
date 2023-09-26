<script setup lang="ts">
const fields = [
  {
    name: 'Complejo 1',
    image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg'
  },
  {
    name: 'Complejo 2',
    image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg'
  },
  {
    name: 'Complejo 3',
    image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg'
  },
  {
    name: 'Complejo 4',
    image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg'
  },
]
</script>

<template>
  <div class="container">
    <h2 class="container-title">
      Disfruta de tus mejores jugadas en HD
    </h2>
    <p class="container-question">
      ¿En dónde jugaste?
    </p>
    <div class="container-cards">
      <FieldCard
      v-for="(field, index) in fields"
      :key="index"
      :name="field.name"
      :image="field.image"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  &-title {
    font-size: $h1-font-size;
    text-align: center;
  }
  &-question {
    font-size: $h2-font-size;
    text-align: center;
  }
  &-cards {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }
}
</style>