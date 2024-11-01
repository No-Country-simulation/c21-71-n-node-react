import {  Response } from "express";
import { deleteShelterByIdService, findShelterByIdService, getAllShelterService, updateShelterByEmailService, updateShelterByIdService } from "../services/shelter-service";
import { UpdateShelter } from "../../types";
import { MyRequest } from "../../types-back";

export const getAllShelters=async(req:MyRequest,res:Response)=>{
    try{
        const roleId=req.roleId
        if(roleId===1){
            
        const shelters=await getAllShelterService()
        res.status(200).json({ok:true,shelters})
        }else{
            res.status(401).json({ok:false,error:'Unauthorized'})
        }
    }catch(error){
        res.status(500).json({error})
    }
}


export const getShelter=async(req:MyRequest,res:Response)=>{
    try{
        
        const shelter = await findShelterByIdService(Number(req.params['id']))
        if(shelter){
            res.status(200).json({ok:true,shelter})    
        
        }else{
            res.status(404).json({ok:false,error:'Not Found'})
        }
        

    }catch(error){
        res.status(500).json({ok:false,error})
    }

}

export const updateShelter=async(req:MyRequest,res:Response)=>{
    try{
        const roleId=req.roleId
        if(roleId===3){
            const email= req.email!
            const {payload}:UpdateShelter=req.body
            const shelter= await  updateShelterByEmailService({userEmail:email,payload})
            res.status(201).json({ok:true,shelter})
        }else if(roleId===1){
            
            const {id,payload}:UpdateShelter=req.body
            const shelter= await  updateShelterByIdService({id,payload})
            res.status(201).json({ok:true,shelter})
        }
        
    }catch(error){
        res.status(500).json({ok:false,error})
    }
}



export const deleteShelter=async(req:MyRequest,res:Response)=>{
    try{
        const roleId=req.roleId
        const email=req.email
        const id=Number(req.params['id'])
        if(roleId===1){
            const shelter=await findShelterByIdService(id)
            if(shelter){
                const shelterErased=await deleteShelterByIdService(id)
                res.status(200).json({ok:true,shelterErased})
            }else{
                res.status(404).json({ok:false,error:'recurso no encontrado'})
            }
        }else if (roleId===3){
            const shelter=await findShelterByIdService(id)
            if(shelter){
                if(shelter.email===email){
                    
                const shelterErased=await deleteShelterByIdService(id)
                res.status(200).json({ok:true,shelterErased})
                }else{
                    res.status(401).json({ok:false,error:'Unauthorized'})
                }
            }

        }

        
    }catch(error){
        res.status(500).json({ok:false,error})
    }
}
