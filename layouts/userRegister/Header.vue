<script setup lang="ts">
import { RouterLink } from "vue-router";
import { userRegisterItems } from '@/utils/MenuItems';
import { computed } from "vue";
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

const emit = defineEmits();

const toggleMenu = () => {
	emit("toggle-menu");
};

const menu = computed(() => userRegisterItems);
const username = computed(() => userStore.user?.email)
console.log(userStore.user)

function handleLogout(): void {
  userStore.logout();
}

</script>

<template>
	<header class="header">
		<RouterLink to="/">
      <figure>
			  <img src="@/assets/videobox.png" alt="VideoBox" />
		  </figure>
    </RouterLink>
		<div class="header-icon" @click="toggleMenu">
			<i class="fa-solid fa-bars" />
		</div>
		<div class="header-buttons">
			<RouterLink
				class="header-buttons-button"
				v-for="(button, index) in menu"
				:to="button.link"
				:key="index"
			>
				{{ button.name }}
			</RouterLink>
			<div class="header-buttons-logout">
				<p @click="handleLogout">{{ username || 'Invitado' }}</p>
				<CrushButton 
					class="button"
					label="Cerrar Sesión" />
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
	padding: 24px 12px;
	@media (min-width: $tablet-lower-breakpoint) {
		padding: 24px;
	}
	&-icon {
		display: flex;
		color: $white;

		@media (min-width: $tablet-upper-breakpoint) {
			display: none;
		}
	}

	&-buttons {
		display: none;

		@media (min-width: $tablet-upper-breakpoint) {
			display: flex;
			gap: 16px;
			justify-content: space-around;
			align-items: center;

			& :first-child {
				color: $white;
			}

			& :nth-child(2) {
				border: 1px solid $purple;

			}

			& :nth-child(3) {
				background-color: $purple;
				color: $white;
			}
		}

		&-button {
			border-radius: 8px;
			text-decoration: none;
			padding: 12px 16px;
			color: $white;
			background: none;
			border: none;
			outline: none;
			font-weight: 700;
			font-size: $body-font-size;
		}
		&-logout .button {
			display: none;  
		position: absolute;
		top: 100%;  
		left: 50%;  
		transform: translateX(-50%); 
		margin-top: 8px; 
		}
	}
}
</style>