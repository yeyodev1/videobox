<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import CrushTextField from '@nabux-crush/crush-text-field';
import CrushButton from '@nabux-crush/crush-button';

import { validateEmail } from '@/utils/AuthValidations';

const router = useRouter();
import useUserStore from '@/store/userStore';


const userStore = useUserStore();


// it forces to re-render the component once the value change
const textKey = ref(0);
const isPasswordVisible = ref(false);
const userEmailForRecovery = ref('');
const userData = reactive({
  email: '',
  password: '',
});
const userRules = {
  emailValidation: [
    {
      validate: (value: string) => validateEmail(value),
      message: 'Ingresa un correo válido' 
    },
    {
      validate: (value: string) => value.length,
      message: 'Ingresa un correo'
    }
  ],
  passwordValidation: [
    {
      validate: (value: string) => value.length > 7,
      message: 'El password debe tener al menos 10 caracteres' 
    }
  ]
}
const enableForm = computed(() => {
  return userData.email !== '' &&
    userData.password !== '' &&
    userRules.emailValidation.every((rule) => rule.validate(userData.email)) &&
    userRules.passwordValidation.every((rule) => rule.validate(userData.password))
});
const passwordIcon = computed(() => {
  return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const textType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password';
});


async function handleLogin(): Promise<void> {
  try {
    await userStore.login(userData.email.trim().toLocaleLowerCase(), userData.password.trim());
    resetValue();
    if(userStore.user) {
        router.push('/');
      } 
  } catch (error) {
    console.error("Error during login:", error);
  }

  const lastVideoUrl = localStorage.getItem('lastVideoUrl');
  if (lastVideoUrl) {
    await router.push(lastVideoUrl);
    localStorage.removeItem('lastVideoUrl');  
  } else {
    await router.push('/');
  }
}
async function handlePasswordRecovery() {
  const email = window.prompt('Por favor, introduce tu correo electrónico para recuperar tu contraseña:');
  if (email && validateEmail(email)) {
    userEmailForRecovery.value = email;
    try {
      await userStore.recoverPassword(email);
      alert('revisa tu correo electronico')
    } catch (error) {
      console.error('Error en la recuperación de contraseña:', error);
      alert('Hubo un error al intentar recuperar la contraseña. Por favor, inténtalo de nuevo más tarde.');
    }
  } else if (email) {
    alert('Por favor, introduce un correo electrónico válido.');
  }
}


function resetValue(): void {
  userData.email = '';
  userData.password = '';
  textKey.value ++
}

</script>

<template>
  <div class="login-wrapper crush-container">
    <p class="login-wrapper-title">
      Que gusto verte nuevamente 🌟 <br> Ingresa ahora
    </p>
    <span 
      v-if="userStore.errorMessage"
      class="login-wrapper-warning">
      *{{ userStore.errorMessage }}*
    </span>
    <div class="login-wrapper-card">
      <CrushTextField
        :key="textKey"
        v-model="userData.email"
        label="Correo"
        :validRules="userRules.emailValidation" />
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.password"
        label="Contraseña"
        :type="textType"
        :validRules="userRules.passwordValidation">
        <template #icon>
          <button
            class="icon-button"
            @click="isPasswordVisible = !isPasswordVisible">
            <i :class="passwordIcon" />
          </button>
        </template>
      </CrushTextField>
      <CrushButton
        variant="primary"
        text="Inicia Sesión"
        :disabled="!enableForm"
        @click.prevent="handleLogin" />
    </div>
    <span class="login-wrapper-span">
      ¿Aún no tienes cuenta? 
      <RouterLink 
        class="login-wrapper-span-link"
        to="/userregister">
        Regístrate ahora
      </RouterLink> 
    </span>
    <span class="login-wrapper-span">
      ¿Olvidaste tu contraseña?
      <a class="login-wrapper-span-link" @click="handlePasswordRecovery">
        Recupérala aquí
      </a>
  </span>
  </div>
</template>

<style lang="scss" scoped>
:deep(.calendar-input) {
  color: $white;
}
.login-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
  &-title {
    color: $white;
    font-size: $body-font-size;
    text-align: center;
    @media (min-width: $tablet-lower-breakpoint) {
      font-size: $h3-font-size;
    }
  }
  &-warning {
    color: $red;
  }
  .date-message {
    color: $red;
  }
  &-card {
    border: 1px solid $grey;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 520px;
    border-radius: 8px;
    padding: 32px;
    background: rgba(141, 141, 157, 0.08);
    backdrop-filter: blur(40px);
    @media(max-width: $tablet-lower-breakpoint) {
      border: none;
    }
    .hoot-text-field {
      :first-child {
        margin-bottom: 8px;
      }
    }
    .icon-button {
      background-color: transparent;
      color: $white;
      border: none;
    }
    .crush-button {
      margin-top: 12px;
    }
    :deep(.crush-text-field .input-container.active) {
      border-color: $purple;
    }
    :deep(.crush-primary) {
      background-color: $purple;
    }
  }
  &-span {
    color: $white;
    &-link {
      color: $purple;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>