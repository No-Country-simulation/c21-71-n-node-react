
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { INewUser, newUserSchema, TEmailPassword } from '../../types';
import { createUser, findUserByEmail } from '../services/user-sevice';
import { generateToken } from '../services/jwt-service';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}



export const register = async (req: Request, res: Response) => {
  const {type}:{type:string} =req.body;

  if(type==='adopter'){
      const user:INewUser=req.body
  const userValidate=newUserSchema.safeParse(user)

  if(userValidate.success===true){
    const {email,firstname,lastname,phone,password,roleId}=userValidate.data
  


  const salt = await bcryptjs.genSalt(10);
  const encryptedPassword = await bcryptjs.hash(password, salt);

  const newUser = await createUser({email,firstname,lastname,phone,encryptedPassword,roleId})

  const token = generateToken(newUser,'1h')

  res.status(201).json({ ok: true, token });
  }else{
    const dataError=userValidate.error.issues[0]
    res.status(400).json({msg:dataError.code,field:dataError.path,description:dataError.message})
  }    
  }else if(type==='shelter'){
    res.json({type})
    
  }


};



export const login = async (req: Request<TEmailPassword>, res: Response) => {
  const { email, password } = req.body;
  
  

  const user = await findUserByEmail(email)

  if(user){
    
      const isMatchPassword= await bcryptjs.compare(password,user.password)
      if(isMatchPassword){
        const token =  generateToken(user,'1h')
      
        res.status(201).json({ ok: true, token });
      }else{
        res.status(401).json({error:'invalid credentials'})  
      }

      
  
    
  }else{
    res.status(404).json({error:'usuario no encontrado'})
  }

  
  
};

