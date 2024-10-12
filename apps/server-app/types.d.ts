import {z} from 'zod'

const newUserSchema=z.object({
  email:z.string().email('El email debe ser valido'),
  firstname:z.string().min(4,'El nombre es obligatorio '),
  lastname:z.string().min(4,'El apellido es obligatorio '),
  phone:z.string().min(8,'El número de teléfono debe tener al menos 8 caracteres'),
  password:z.string().min(8,'La contraseña debe tener al menos 8 caracteres'),
  roleId:z.union([z.literal(2),z.literal(3)],'El valor debe ser 2 0 3')
})


/* export interface INewUser {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  roleId: 2|3;
} */

export type INewUser=z.infer<typeof newUserSchema>


export const emailPasswordSchema=newUserSchema.pick({
  email:true,
  password:true
})

// export type TEmailPassword = Pick<INewUser, 'email' | 'password'>;
export type TEmailPassword=z.infer<typeof emailPasswordSchema>




/* export interface ICreateUser extends Omit<INewUser, 'password'> {
  encryptedPassword: string;
} */

export const createUserSchema=newUserSchema.omit({password:true}).extend({
  encryptedPassword:z.string().min(8,'La contraseña debe tener al menos 8 caracteres'),
})

export type ICreateUser =z.infer<typeof createUserSchema>




export type  CustomRequest ={
  email?: string;
  roleId?: number;
} 

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
export const updateUserSchema=z.object({
  id:z.number(),
  payload:z.object({
    email:z.string().optional(),
    firstname:z.string().optional(),
    lastname:z.string().optional(),
    phone:z.string().optional(),
    password:z.string().optional(),
    roleId:z.number().optional(),
  })
})

export type UpdateUser=z.infer<typeof updateUserSchema>


/* export interface InfoPet{
  name:string
  description:string
  type:string
  imageUrl:string
}
 */
export const infoPetSchema=z.object({
  name:z.string(),
  description:z.string(),
  type:z.string(),
  imageUrl:z.string(),

})

export type InfoPet=z.infer<typeof infoPetSchema>

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


export const updatePetSchema=z.object({
  id:z.number(),
  infoPet:z.object({
    name:z.string().optional(),
  description:z.string().optional(),
  type:z.string().optional(),
  imageUrl:z.string().optional(),
  })
})


export type UpdateInfoPet=z.infer<typeof updatePetSchema>