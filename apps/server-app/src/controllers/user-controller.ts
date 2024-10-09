
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { INewUser, TEmailPassword } from '../../types';
import { createUser, findUserByEmail } from '../services/user-sevice';
import { generateToken } from '../services/jwt-service';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}



export const userRegister = async (req: Request, res: Response) => {
  const { email, firstname, lastname, phone, password, roleId }: INewUser =req.body;

  const salt = await bcryptjs.genSalt(10);
  const encryptedPassword = await bcryptjs.hash(password, salt);

  const newUser = await createUser({email,firstname,lastname,phone,encryptedPassword,roleId})

  const token = generateToken(newUser,'1h')

  res.status(201).json({ ok: true, token });
};



export const userLogin = async (req: Request<TEmailPassword>, res: Response) => {
  const { email, password } = req.body;
  

  const user = await findUserByEmail(email)

  if(user){
    
      const isMatchPassword= await bcryptjs.compare(password,user.password)
      if(isMatchPassword){
        const token =  generateToken(user,'1h')
      
        res.status(201).json({ ok: true, token });
      }
      res.status(401).json({error:'invalid credentials'})
   
  
  }

  res.status(404).json({error:'usuario no encontrado'})
  
};

