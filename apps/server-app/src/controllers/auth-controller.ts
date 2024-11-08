import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { INewUser, NewShelter, newShelterSchema, newUserSchema, TEmailPassword } from '../../types';
import { createUser, findUserByEmail } from '../services/user-sevice';
import { generateToken } from '../services/jwt-service';
import { createShelterService, findShelterByEmailService } from '../services/shelter-service';
import { passwordEncryptor } from '../services/password-encryptor';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}



export const register = async (req: Request, res: Response) => {
  const {type}:{type:string} =req.body;


  if(type==='adopter'){
       
    const {user: user}:{user:INewUser}=req.body

    const userValidate=newUserSchema.safeParse(user)


  if(userValidate.success===true){
  
    const findShelter=await findShelterByEmailService(user.email)
    const findUser = await findUserByEmail(user.email)

  if(findShelter || findUser){
    res.status(400).json({ok:false,error:'el usuario ya existe en la base de datos'})
  
  }else{
    const {email,firstname,lastname,phone,password}=userValidate.data

    let encryptedPassword=await passwordEncryptor(password)
    const newShelter = await createUser({email,firstname,lastname,phone,password: encryptedPassword})

    const token = generateToken(newShelter,'3d')

    res.status(201).json({ ok: true, token });
  }


  
}else{
  const dataError=userValidate.error.issues[0]
  res.status(400).json({msg:dataError.code,field:dataError.path,description:dataError.message})
}       
  }else if(type==='shelter'){
       
      const {user: user}:{user:NewShelter}=req.body

   const userValidate=newShelterSchema.safeParse(user)

  if(userValidate.success===true){
    
    const findShelter=await findShelterByEmailService(user.email)
    const findUser = await findUserByEmail(user.email)

    if(findShelter || findUser){
      res.status(400).json({ok:false,error:'el usuario ya existe en la base de datos'})
    
    }else{
      const {email,shelter_name,phone,password}=userValidate.data

      const encryptedPassword = await passwordEncryptor(password);

      const newShelter = await createShelterService({email,shelter_name,phone,password:encryptedPassword})

      const token = generateToken(newShelter,'3d')

      res.status(201).json({ ok: true, token });
    }


    
  }else{
    const dataError=userValidate.error.issues[0]
    res.status(400).json({msg:dataError.code,field:dataError.path,description:dataError.message})
  }       
    }else{
      res.status(400).json({ok:false,error:'the property “type” was not found : is required'})
    }
    
  }


;


export const login = async (req: Request<TEmailPassword>, res: Response) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);


  if (user) {
    const isMatchPassword = await bcryptjs.compare(password, user.password);
    if (isMatchPassword) {
      const token = generateToken(user, '3d');

      res.status(201).json({ ok: true, token });
    } else {
      res.status(401).json({ error: 'invalid credentials' });
    }
  } else {
    const shelter = await findShelterByEmailService(email);

    if (shelter) {
      const isMatchPassword = await bcryptjs.compare(password, shelter.password);
      if (isMatchPassword) {
        const token = generateToken(shelter, '3d');

        res.status(201).json({ ok: true, token });
      } else {
        res.status(401).json({ error: 'invalid credentials' });
      }
    } else {
      res.status(404).json({ error: 'usuario no encontrado' });
    }
  }
};
