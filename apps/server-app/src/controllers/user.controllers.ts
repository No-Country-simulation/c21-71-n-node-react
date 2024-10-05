import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { INewUser, TEmailPassword } from '../../types';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const prisma = new PrismaClient();

export const userRegister = async (req: Request, res: Response) => {
  const { email, firstname, lastname, phone, password, roleId }: INewUser =
    req.body;

  const salt = await bcryptjs.genSalt(10);
  const encryptedPassword = await bcryptjs.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      firstname,
      lastname,
      phone,
      password: encryptedPassword,
      roleId,
    },
  });

  const token = jwt.sign(
    {
      email: newUser.email,
      roleId:newUser.roleId
    },

    jwtSecret,

    {
      expiresIn: '1h',
    }
  );

  res.status(201).json({ ok: true, token });
};



export const userLogin = async (req: Request<TEmailPassword>, res: Response) => {
  const { email, password } = req.body;
  

  const user = await prisma.user.findUnique({
    where: {
      email:email,
      
    },
  });

  if(user){
    
      const isMatchPassword= await bcryptjs.compare(password,user.password)
      if(isMatchPassword){
        const token = jwt.sign(
          {
            email: user.email,
            roleId:user.roleId
          },
      
          jwtSecret,
      
          {
            expiresIn: '1h',
          }
        );
      
        res.status(201).json({ ok: true, token });
      }
      res.status(401).json({error:'invalid credentials'})
  
    
  }

  res.status(404).json({error:'usuario no encontrado'})
  
};

