import { Request } from 'express';
import { z } from 'zod'

const newUserSchema = z.object({
  email: z.string().email('El email debe ser valido'),
  firstname: z.string().min(4, 'El nombre es obligatorio '),
  lastname: z.string().min(4, 'El apellido es obligatorio '),
  phone: z.string().min(8, 'El número de teléfono debe tener al menos 8 caracteres'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  roleId: z.union([z.literal(2), z.literal(3)], 'El valor debe ser 2 0 3')
})


/* export interface INewUser {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  roleId: 2|3;
} */

export type INewUser = z.infer<typeof newUserSchema>


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


export interface InfoPet {
  name?: string
  description: string
  type: string
  imageUrl: string
}

export interface UpdateInfoPet {
  id: number
  infoPet: {
    name?: string
    description?: string
    type?: string
    imageUrl?: string
  }
}

// types Hector
