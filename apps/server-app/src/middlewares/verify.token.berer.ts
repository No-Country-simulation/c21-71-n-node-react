import {  Response, NextFunction } from 'express';
//import { CustomRequest } from '../../types';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../../types';

const jwtSecret = process.env.JWT_SECRET;

if (jwtSecret) {
  console.log('secret key  encontrado');
  
}else{
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const verifyToken = async (req:CustomRequest,res:Response,next:NextFunction)=> {

  const  authHeader=req.headers.authorization
  const token=authHeader?.replace('Bearer ','')

  if(token){
    try{
      const {email,roleId}=jwt.verify(token,jwtSecret) as JwtPayload
      req.email=email
    req.roleId=roleId
    console.log(email,roleId);
    next()
    }catch(error:any |undefined){
      res.json(error.message)
      
      
    }
    
  }else{
    res.json({error:'No token provided'})
  }

  
  
  
  

};
