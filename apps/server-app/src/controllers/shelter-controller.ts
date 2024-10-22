import { Request, Response } from "express";
import { deleteShelterByIdService, findShelterByIdService, getAllShelterService, updateShelterByIdService } from "../services/shelter-service";
import { UpdateShelter } from "../../types";

export const getAllShelters=async(_req:Request,res:Response)=>{
    try{
        const shelters=await getAllShelterService()
        res.status(200).json({ok:true,shelters})
    }catch(error){
        res.status(500).json({error})
    }
}


export const getShelter=async(req:Request,res:Response)=>{
    try{
        const shelter = await findShelterByIdService(Number(req.params['id']))
        res.status(200).json({ok:true,shelter})
    }catch(error){
        res.status(500).json({ok:false,error})
    }

}


export const updateShelter=async(req:Request,res:Response)=>{
    try{
        const {id,payload}:UpdateShelter=req.body
    const shelter= await  updateShelterByIdService({id,payload})
    res.status(201).json({ok:true,shelter})
    }catch(error){
        res.status(500).json({ok:false,error})
    }
}



export const deleteShelter=async(req:Request,res:Response)=>{
    try{
        const shelterErased=await deleteShelterByIdService(Number(req.params['id']))
    res.status(200).json({ok:true,shelterErased})
    }catch(error){
        res.status(500).json({ok:false,error})
    }
}
