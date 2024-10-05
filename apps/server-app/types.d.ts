import { Request } from "express";

export interface INewUser {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password:string
  roleId :number
}


export type TEmailPassword=Pick<INewUser,"email"|"password">


interface CustomRequest extends Request{
  email? :string
  roleId?:number
}
