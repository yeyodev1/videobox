import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';


import APIUsers from '@/services/User/User';
import type { User } from '@/typings/UserTypes';
import type { ImageFile } from '@/typings/FileTypes';

const router = useRouter(); 

const userService = new APIUsers(); 

interface Roostate {
  user: User | null,
  errorMessage: string | null,
  isLoading: boolean,
  passwordSent: boolean | null
}

export const useUserStore = defineStore('UserStore', {
  state: (): Roostate => ({
    user: null,
    errorMessage: null,
    isLoading: false,
    passwordSent: null
  }),

  actions: {
    async uploadUserImage(file: File): Promise<ImageFile | void> {
      this.isLoading = true;
      try {
        const response = await userService.uploadUserImage(file);
        return response.data;
      } catch (error: any) {
        this.errorMessage = error.message;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async login(email: string, password: string): Promise<void> {
      this.isLoading = true
      try {
        const response = await userService.login(email, password)
        this.user = response.data
    
        localStorage.setItem('access_token', this.user?.token!)
        // No realizar redirección aquí
      } catch (error: any) {
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña no válidos'
        }
      } finally {
        this.isLoading = false
      }
    },

    async register(email: string, password: string, birthdate: string): Promise<void> {
      this.isLoading = true;
      try {
        await userService.register(email, password, birthdate);
      } catch (error: any) {
        this.errorMessage = 'Ups, hay un problema con el correo, inténtalo más tarde :D';
        throw error;  
      } finally {
        this.isLoading = false;
      }
    },
    

    async getSession(): Promise<void> {
      this.isLoading = false;
      try {
        const response = await userService.getSession();
        this.user = response.data;
      } catch (error: any) {
        console.error(error)
      } finally {
        this.isLoading = false;
      }
    },

    async logout(): Promise<void> {
      this.isLoading = true;
      try {
        localStorage.removeItem('access_token');
        this.user = null;
        await router.push('/');
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async updateUser(user: User): Promise<void> {
      this.isLoading = true;
      try {
        await userService.updateUser(this.user?.id!, user);
        await this.getSession();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async updatePasswordRequest(email: string): Promise<void> {
      this.isLoading = true;
      try {
        await userService.updatePasswordRequest(email);
        this.emailSent = true;
      } catch (error: any) {
        this.errorMessage = error.message;
        this.emailSent = false;
      } finally {
        this.isLoading = false;
      }
    },

    async updatePassword(id: string, password: string): Promise<void> {
      this.isLoading = true;
      try {
        await userService.updatePassword(id, password);
        this.passwordSent = true;
      } catch (error: any) {
        this.errorMessage = error.message;
        this.passwordSent = false;
      } finally {
        this.isLoading = false;
      }
    }
    
  }
});

export default useUserStore;