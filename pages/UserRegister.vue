<script setup lang="ts">
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushButton from '@nabux-crush/crush-button';
import { computed, reactive, ref } from 'vue';

import useUserStore from '@/store/userStore';
import { calculateAge, validateEmail, validateSymbol } from '@/utils/AuthValidations';
import CalendarInput from '@/components/CalendarInput.vue';

const userStore = useUserStore();

const router = useRouter();

// it forces to re-render the component once the value change
const textKey = ref(0);
const isPasswordVisible = ref(false);
const isRepeatedPasswordVisible = ref(false);
const isMinor = ref(false);
const userData = reactive({
  email: '',
  password: '',
  birthdate: '',
  passwordRepeated: '',
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
    },
    {
      validate: (value: string) => validateSymbol(value),
      message: 'El password debe tener al menos un caracter especial $%&|<>#^ caracteres' 
    }
  ],
  passwordRepeatedValidation: [
    {
      validate: (value: string) => userData.password === value,
      message: 'El password no coincide'
    },
  ]
}
const enableForm = computed(() => {
  return userData.email !== '' &&
    userData.password !== '' &&
    userData.birthdate !== '' &&
    !isMinor.value &&
    userRules.emailValidation.every((rule) => rule.validate(userData.email)) &&
    userRules.passwordValidation.every((rule) => rule.validate(userData.password)) &&
    userRules.passwordRepeatedValidation.every((rule) => rule.validate(userData.passwordRepeated))
});
const passwordIcon = computed(() => {
  return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const passwordRepeatedIcon = computed(() => {
  return isRepeatedPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const textType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password';
});
const textRepeatedType = computed(() => {
  return isRepeatedPasswordVisible.value ? 'text' : 'password';
});

function calculateAgeInput(): void {
  if (userData.birthdate !== '') {
    isMinor.value = false;
  }
  const age = calculateAge(userData.birthdate);
  if (age < 16) {
    isMinor.value = true;
  }
}

function handleInput(event: string): void {
  userData.birthdate = event;
  calculateAgeInput();
  setTimeout(() => {
    isMinor.value = false;
  }, 5000); 
}

function resetValue(): void {
  userData.email = '';
  userData.password = '';
  userData.passwordRepeated = '';
  userData.birthdate = '';
  textKey.value ++
}


async function handleRegister(): Promise<void> {
  try {
    await userStore.register(
      userData.email.trim().toLocaleLowerCase(), 
      userData.password.trim(), 
      userData.birthdate.trim()
    );
    console.log('Registro completado');
    resetValue();

    await router.push('/userlogin');
  } catch (error) {
    console.error('Error en el registro:', error);
  }
}

</script>

<template>
  <div class="register-wrapper crush-container">
    <span
      v-if="isMinor"
      class="date-message">
      Debes tener al menos 16 años
    </span>
    <p class="register-wrapper-title">
      ¿Primera vez en VideoBox? 🌟 <br> Únete ya
    </p>
    <!-- <span 
      v-if="userStore.errorMessage"
      class="register-wrapper-warning">
      *{{ userStore.errorMessage }}*
    </span> -->
    <div class="register-wrapper-card">
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
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.passwordRepeated"
        label="Repita su contraseña"
        :type="textRepeatedType"
        :validRules="userRules.passwordRepeatedValidation">
        <template #icon>
          <button
            class="icon-button"
            @click="isRepeatedPasswordVisible = !isRepeatedPasswordVisible">
            <i :class="passwordRepeatedIcon" />
          </button>
        </template>
      </CrushTextField>
      <CalendarInput
        label="Fecha de nacimiento"
        class="calendar-input"
        :value="userData.birthdate"
        @input="handleInput($event)" />
      <CrushButton
        variant="primary"
        text="Registro"
        :disabled="!enableForm"
        @click.prevent="handleRegister" />
    </div>
    <span class="register-wrapper-span">
      ¿Ya tienes cuenta?
      <RouterLink 
        class="register-wrapper-span-link"
        to="/userlogin">
        Inicia sesion ahora
      </RouterLink>
    </span>
  </div>
</template>

<style lang="scss" scoped>
:deep(.calendar-input) {
  color: $white;
}
.register-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
  max-width: $desktop-lower-breakpoint;
  .date-message {
    color: $red;
  }
  &-title {
    color: $white;
    font-size: $body-font-size;
    text-align: center;
    @media (min-width: $tablet-lower-breakpoint) {
      font-size: $h3-font-size
    }
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
    }
  }
}
</style>