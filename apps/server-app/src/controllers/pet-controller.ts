import { Request, Response } from "express";
import { createPetService, deletePetService, findPetByIdService, getAllPetService, updatePetService } from "../services/pet-services";
import { InfoPet, UpdateInfoPet } from "../../types";
import { MyRequest } from "../../types-back";
import { findShelterByEmailService } from "../services/shelter-service";

export const getPets = async (_req: Request, res: Response) => {
    try {
        const petsList = await getAllPetService()
        res.status(200).json({ ok: true, petsList })
        return
    } catch (error) {
        res.status(400).json({ ok: false, error })
        return
    }
}

export const createPet = async (req: MyRequest, res: Response) => {
    try {
        const email=req.email
        if(email){
            const shelter=await findShelterByEmailService(email)
            if(shelter){
                const { name, description, type, imageUrl }: InfoPet = req.body
        
                const newPet = await createPetService({ name, description, type, imageUrl,shelterId:shelter.id })
                res.status(201).json({ ok: true, newPet })
            }
       
        }
        
    } catch (error) {
        res.status(403).json({ ok: false, error ,msg:"esta fallando algo"})
    }
}

export const findPetById = async (req: Request, res: Response) => {
    try {
        const findPet = await findPetByIdService(Number(req.params['id']))
        res.status(200).json({ ok: true, findPet })
    } catch (error) {
        res.status(401).json({ ok: false, error })
    }
}

export const updatePet = async (req: Request, res: Response) => {
    try {
        const { id, infoPet: { name, description, type, imageUrl } }: UpdateInfoPet = req.body
        const changeInfoPet = await updatePetService({ id, infoPet: { name, description, type, imageUrl } })
        res.status(200).json({ ok: true, changeInfoPet })
    } catch (error) {
        res.status(400).json({ ok: false, error })
    }
}

export const deletePet = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params['id'])
        const dropPet = await deletePetService(id)
        res.status(200).json({ ok: true, message: "la Mascota ha sido borrada", dropPet })
    } catch (error) {
        res.status(400).json({ ok: false, error })
    }
}
