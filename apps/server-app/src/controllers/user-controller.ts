import { Request, Response } from 'express';
import { deleteUserByIdService, findUserById, getAllUsersService, updateUserByEmailService, updateUserByIdService } from '../services/user-sevice';
import { UpdateUser } from '@adopcion/types';
import { MyRequest } from '../../types-back';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ ok: true, users });
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


export const updateUser=async(req:MyRequest,res:Response)=>{
  try {
    const roleId=req.roleId
    if(roleId===1){
      const {id,payload}:UpdateUser= req.body
    const user=await updateUserByIdService({id,payload})
    res.status(200).json({ok:true,user})
    }else if(roleId===2){
      const userEmail=req.email!
      const {payload}:UpdateUser= req.body

      
      
    const user=await updateUserByEmailService({userEmail,payload})
    
    res.status(200).json({ok:true,user})
    }

    
  } catch (error) {
    res.status(500).json({ error });
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