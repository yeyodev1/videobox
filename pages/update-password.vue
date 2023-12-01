<script setup>
import useUserStore from '@/store/userStore';

const router = useRouter()

const userStore = useUserStore();

const recoveryCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

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
</script>

<template>
  <div class="update-password-wrapper">
    <h2>Actualizar Contraseña</h2>
    <input v-model="recoveryCode" type="text" placeholder="Código de Recuperación" />
    <input v-model="newPassword" type="password" placeholder="Nueva Contraseña" />
    <input v-model="confirmPassword" type="password" placeholder="Confirmar Contraseña" />
    <button @click="handleUpdatePassword">Actualizar Contraseña</button>
  </div>
</template>