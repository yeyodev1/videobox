import { AxiosResponse } from 'axios';

import APIBase from '../Base';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
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

  async recoverPassword(email: string): Promise<AxiosResponse<ResponseMessageType>> {
    return this.post('auth/password-recovery-request', { email });
  }

  async verifyEmail(token: String): Promise<AxiosResponse<ResponseMessageType>>{
    return this.patch(`auth/verify-email/${token}`, {token});
  }


  async updatePassword(token: string, newPassword: string): Promise<AxiosResponse<ResponseMessageType>> {
    return this.patch("auth/password-recovery", {
		id: token,
		password: newPassword,
	});

  }
}


export default APIUsers;