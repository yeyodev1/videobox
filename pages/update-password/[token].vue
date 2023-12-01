<script setup>
import CrushTextField from '@nabux-crush/crush-text-field';
import { useRoute, useRouter } from 'vue-router';


import useUserStore from '@/store/userStore';

const router = useRouter()
const route = useRoute()

const userStore = useUserStore();

const recoveryCode = ref(route.params.token);
const newPassword = ref('');
const confirmPassword = ref('');

console.log(recoveryCode.value)
const validationRules = {
  passwordRules: [
    {
      validate: (value) => value.length > 7,
      message: 'El password debe tener al menos 10 caracteres' 
    },
  ],
  confirmPasswordRules: [
    {
      validate: value => value === newPassword.value,
      message: 'Las contraseñas no coinciden'
    }
  ]
};

async function handleUpdatePassword() {
  if(newPassword.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden.');
    return
  }
  try {
    await userStore.updatePassword(recoveryCode.value, newPassword.value);
    alert('Tu contraseña ha sido actualizada con éxito');
    router.push('/userlogin');
  } catch (error) {
    alert(userStore.errorMessage);
  }
}

watchEffect(() => {
  recoveryCode.value = route.params.token || 'hola';
});
</script>

<template>
  <div class="container">
    <h2 class="container-title">Actualizar Contraseña</h2>
    <CrushTextField 
      label="Nueva contraseña"
      :valid-rules="validationRules.passwordRules"
      v-model="newPassword" 
      class="container-input"/>
    <CrushTextField 
      label="Repite la contraseña"
      :valid-rules="validationRules.confirmPasswordRules"
      v-model="confirmPassword" 
      class="container-input"/>
    <button @click="handleUpdatePassword">Actualizar Contraseña</button>
  </div>
</template>

<style lang="scss" scoped>
.container{
  margin: 88px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  &-title {
    font-size: $body-font-size * 3;
    text-align: center;
  }
  &-input {
    width: 80%;
  }
  button {
    padding: 16px;
    background-color: $purple;
    color: $white;
    border-radius: 8px;
    font-size: $body-font-size;
    border: none;
    &:hover {
      background-color: darken($purple, 15%);
      cursor: pointer;
      font-weight: 700;
    }
  }
}
</style>