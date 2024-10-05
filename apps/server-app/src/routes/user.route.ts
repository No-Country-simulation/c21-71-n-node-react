import { Router, Request,Response } from "express";
import {  userRegister ,userLogin} from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/verify.token.berer";



const router=Router()


router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/me',verifyToken,async (_req:Request,res:Response)=>{ res.json({mensaje:'Hola mundo'})})

export default router