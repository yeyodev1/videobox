import { AxiosResponse } from 'axios';

import APIBase from '../Base';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
import type { ImageFile } from '@/typings/FileTypes';
import type { User } from '@/typings/UserTypes';


class APIUsers extends APIBase {
  async login(email: string, password: string): Promise<AxiosResponse<User>> {
    return this.post('auth/login', { email: email, password: password })
  }

  async register(email: string, password: string, birthdate: string): Promise<AxiosResponse> {
    return this.post('auth/register', { email, password, birthdate, role: ['user'] })
  }

  async uploadUserImage(file: File): Promise<AxiosResponse<ImageFile>> {
    const formData = new FormData();
    formData.append('userImage', file);
    return this.postWithFormData<AxiosResponse<ImageFile>>(`userImage`, formData);
  }

  async getSession(): Promise<AxiosResponse<User>> {
    return this.get('users/profile'); 
  } 

  async updateUser(id: string, user: User): Promise<ResponseMessageType> {
    const data = {
      id: id,
      ...user
    }
    return this.patch<ResponseMessageType>(`users/${id}`, data);
  }
  
  async updatePasswordRequest(email: string): Promise<ResponseMessageType> {
    return this.post(`auth/password-recovery-request`, { email: email })
  }

  async updatePassword(id: string, password: string): Promise<ResponseMessageType> {
    return this.patch(`auth/password-recovery`, {
      id: id,
      password: password
    })
  } 
}


export default APIUsers;