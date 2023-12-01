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

  async getSession(): Promise<AxiosResponse<User>> {
    return this.get('users/profile'); 
  } 
}


export default APIUsers;