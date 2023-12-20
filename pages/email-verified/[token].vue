<script setup>
import APIUsers from '@/services/User/User';

const apiUSers = new APIUsers();

const route = useRoute();

const verificationStatus = ref('loading'); 

onMounted(async () => {
  const token = route.params.token;
  if (token) {
    try {
      await apiUSers.verifyEmail(token);
      verificationStatus.value = 'success';
    } catch (error) {
      console.error('Error verificando el correo electrónico:', error);
      verificationStatus.value = 'error';
    }
  } else {
    verificationStatus.value = 'invalid';
  }
});
</script>

<template>
  <div class="verification-message">
    <p >
      Tu correo ha sido verificado, vuelve al home.
    </p>
    <NuxtLink class="button" to="/">Página de inicio</NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.verification-message  {
  text-align: center;
  font-size: $body-font-size * 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
p {
  font-size: $body-font-size * 3;
}
.button {
  font-size: $body-font-size * 2;
  text-align: center;
  width: 100%;
}
</style>