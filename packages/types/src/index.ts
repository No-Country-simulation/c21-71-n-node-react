

export interface INewUser {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  roleId: 2|3;
}

export interface IUserResponse extends Omit<INewUser, 'password' | 'roleId'> {
  id: number;
  encryptedPassword: string;
  roleId: number; // Aquí redefinimos roleId para aceptar cualquier número
}
export type TEmailPassword = Pick<INewUser, 'email' | 'password'>;

export interface ICreateUser extends Omit<INewUser, 'password'> {
  encryptedPassword: string;
}

/* interface CustomRequest {
  email?: string;
  roleId?: number;
}
 */
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
  imageUrl:string[]
  age:string
}

export interface InfoPetWithId extends InfoPet{
  id: number
}

export interface UpdateInfoPet{
  infoPet:{
    id:number
    name?:string
    description?:string
    type?:string
    imageUrl?:string[]
    age?:string
  }
}