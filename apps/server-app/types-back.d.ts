import { Request } from "express"


interface MyRequest extends Request{
    email?:string
    roleId?:number
  }