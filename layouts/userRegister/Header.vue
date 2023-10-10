<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed } from "vue";
import CrushButton from '@nabux-crush/crush-button';


import { userRegisterItems } from '@/utils/MenuItems';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

const emit = defineEmits();

const showLogoutButton = ref(false);

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
			  <img src="@/assets/videobox-small.png" alt="VideoBox" />
		  </figure>
    </RouterLink>
		<div class="header-section">
			<div
				@mouseover="showLogoutButton = true"
				@mouseleave="showLogoutButton = false" 
				class="header-icon-logout">
				<p>{{ username || 'Invitado' }} <i class="fa-solid fa-chevron-down"></i> </p>
				<transition name="fade">
					<CrushButton 
						v-if="showLogoutButton"
						@click="handleLogout"
						text="Cerrar Sesión" 
						class="button" />
				</transition>
			</div>
			<div class="header-icon" @click="toggleMenu">
					<i class="fa-solid fa-bars" />
			</div>
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
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
		gap: 12px;
		@media (min-width: $tablet-upper-breakpoint) {
			display: none;
		}
	}
	&-section {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
	}
	&-icon {
		&-logout {
				position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
				.user {
					cursor: pointer;
				}
				.button {
					opacity: 0;  
					visibility: hidden; 
					position: absolute;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					top: 100%;
					left: 50%;
					transform: translateX(-50%);
					transition: opacity 1s, visibility 1s;
					background-color: $purple;
					color: white;
					border: none;
					font-weight: 400;
					font-family: $font;
					margin-top: 16px;
					z-index: 0;
					&:hover {
						opacity: 1;
					}
				}
				&:hover .button {
					opacity: 1;
					visibility: visible;
				}
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