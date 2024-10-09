import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../../types';

const jwtSecret = process.env.JWT_SECRET;

if (jwtSecret) {
  console.log('secret key  encontrado');
} else {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (token) {
    try {
      const { email, roleId } = jwt.verify(token, jwtSecret) as JwtPayload;
      req.email = email;
      req.roleId = roleId;
      console.log(email, roleId);
      next();
    } catch (error: any | undefined) {
      res.status(401).json(error.message);
    }
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

export const verifyRoleAdmin = async(req: CustomRequest, res: Response, next: NextFunction) => {
  const role=req.roleId
  
    if(role===1){
      next()
      
    }else{
      res.status(403).json({ error: 'Unauthorized' });  
    }
    

  
  
};