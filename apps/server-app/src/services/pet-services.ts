import { PrismaClient } from '@prisma/client';
import { InfoPet, UpdateInfoPet } from '../../types';


const prisma= new PrismaClient()



export const getAllPetsService=async()=>{
    return await prisma.user.findMany()
}


export const createPetService=async({name,description,type,imageUrl}:InfoPet)=>{
    return await prisma.pet.create({
        data:{
            name,
            description,
            type,
            imageUrl

        }
    })
}


export const findPetByIdService=async(id:number)=>{
    return await prisma.pet.findUnique({
        where:{
            id
        }
    })
}

export const updatePetService=async({id,infoPet:{name,description,type,imageUrl}}:UpdateInfoPet)=>{
    return await prisma.pet.update({
        where:{
            id
        },
        data:{
            name,
            description,
            type,
            imageUrl

        }
    })
}


export const deletePetService=async(id:number)=>{
    return await prisma.pet.delete({
        where:{
            id
        },
        
    })
}