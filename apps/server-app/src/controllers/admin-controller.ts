import { Request, Response } from 'express';
import { findUserById, serviceGetAllUsers } from '../services/user-sevice';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await serviceGetAllUsers();
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