import { Request, Response } from 'express';
import { deleteUserByIdService, findUserByEmail, findUserById, getAllUsersService, updateUserByEmailService, updateUserByIdService } from '../services/user-sevice';
import { UpdateUser } from '@adopcion/types';

export const getAllUsers = async (req: MyRequest, res: Response) => {
  try {
    if(req.roleId!==1){
      res.status(401).json({ok:false,error:'unauthorized'})
    }else{
      const users = await getAllUsersService();
    res.status(200).json({ ok: true, users });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getUserById= async (req: Request, res: Response)=>{
    try{
        const user=await findUserById(Number(req.params['id']))
        res.status(200).json({ok:true,user})
    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateUserById=async(req:Request,res:Response)=>{
  try {
    const {id,payload}:UpdateUser= req.body
    const user=await updateUserByIdService({id,payload})
    res.status(200).json({ok:true,user})
    }else if(roleId===2){
      const userEmail=req.email!
      const findUser=await findUserByEmail(userEmail)
      if(findUser?.email==userEmail){
        const {payload}:UpdateUser= req.body
        const user=await updateUserByEmailService({userEmail,payload})
    
       res.status(200).json({ok:true,user})
      }else{
        throw new Error('unauthorized')
      }
      
    }

    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


export const deleteUserById=async(req:Request,res:Response)=>{
  try {
    const user=await deleteUserByIdService(Number(req.params['id']))
    res.status(200).json({ok:true,user_deleted:user})
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    
  }
}