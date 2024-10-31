import { z } from 'zod';

export const newUserSchema = z.object({
  email: z.string().email({ message: 'debe ser un email valido' }),
  firstname: z.string().min(4, { message: 'El nombre es obligatorio ' }),
  lastname: z.string().min(4),
  phone: z.string().min(8),
  password: z.string().min(8),
});

export const newShelterSchema = z.object({
  shelter_name: z.string().min(5, { message: 'El Nombre debe tener al menos 5 caracteres' }),
  email: z.string().email({ message: 'debe ser un email valido' }),
  phone: z.string().min(8),
  password: z.string().min(8),
});

export type NewShelter = z.infer<typeof newShelterSchema>;

export const updateShelterSchema = z.object({
  id: z.number(),
  payload: z.object({
    shelter_name: z.string().min(5, { message: 'El Nombre debe tener al menos 5 caracteres' }).optional(),
    email: z.string().email({ message: 'debe ser un email valido' }).optional(),
    phone: z.string().min(8).optional(),
    password: z.string().min(8).optional(),
  }),
});
export type UpdateShelter = z.infer<typeof updateShelterSchema>;

/* export interface INewUser {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  roleId: 2|3;
} */

export type INewUser = z.infer<typeof newUserSchema>;

export const emailPasswordSchema = newUserSchema.pick({
  email: true,
  password: true,
});

// export type TEmailPassword = Pick<INewUser, 'email' | 'password'>;
export type TEmailPassword = z.infer<typeof emailPasswordSchema>;

/* export interface ICreateUser extends Omit<INewUser, 'password'> {
  encryptedPassword: string;
} */

export const createUserSchema = newUserSchema.omit({ password: true }).extend({
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type ICreateUser = z.infer<typeof createUserSchema>;

/* export type  CustomRequest ={
  email?: string;
  roleId?: number;
}  */

/* export interface UpdateUser {
  id: number;
  payload: {
    email?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    password?: string;
    roleId?: number;
  };
} */
export const updateUserSchema = z.object({
  id: z.number(),
  payload: z.object({
    email: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),
    roleId: z.number().optional(),
  }),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;

/* export interface InfoPet{
  name:string
  description:string
  type:string
  imageUrl:string
}
 */
export const infoPetDataSchema = z.object({
  name: z.string(),
  age: z.string(),
  description: z.string(),
  type: z.string(),
  
});

// export const infoPetDataImagesSchema=z.instanceof(Express.Multer.File)
 
//export type infoPetDataImages=z.infer<typeof infoPetDataImagesSchema> 

export type InfoPetData = z.infer<typeof infoPetDataSchema>;

/*  export interface UpdateInfoPet{
  id:number
  infoPet:{
    name?:string
  description?:string
  type?:string
  imageUrl?:string
  }
} 
 */

export const updatePetSchema = z.object({
  id: z.number(),


  name: z.string().optional(),
  age: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  imageUrl: z.array(z.object({ url: z.string(), public_id: z.string() })).optional(),
});

export type UpdateInfoPet = z.infer<typeof updatePetSchema>;

