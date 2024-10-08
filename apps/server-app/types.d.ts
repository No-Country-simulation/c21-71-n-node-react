import { Request } from 'express';

export interface INewUser {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  roleId: 2|3;
}

export type TEmailPassword = Pick<INewUser, 'email' | 'password'>;

export interface ICreateUser extends Omit<INewUser, 'password'> {
  encryptedPassword: string;
}

interface CustomRequest extends Request {
  email?: string;
  roleId?: number;
}

export interface UpdateUser {
  id: number;
  payload: {
    email?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    password?: string;
    roleId?: number;
  };
}


export interface InfoPet{
  name:string
  description:string
  type:string
  imageUrl
}

export interface UpdateInfoPet{
  id:number
  infoPet:{
    name?:string
  description?:string
  type?:string
  imageUrl?
  }
}