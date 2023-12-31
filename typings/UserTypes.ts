import { VideoInput } from '@/typings/VideoTypes';

export type User = {
  name?: string,
  lastname?: string,
  userImage?: string,
  role?: 'user' | 'admin',
  email: string,
  phone?: string,
  birthdate: string | Date,
  twitter?: string,
  instagram?: string,
  password?: string,
  isPaid?: boolean,
  _id?: string,  
  token?: string,
  videos: VideoInput[]
}