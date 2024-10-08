import { PrismaClient } from '@prisma/client';
import { InfoPet, UpdateInfoPet } from '../../types';


const prisma= new PrismaClient()



export const getAllPets=async()=>{
    return await prisma.user.findMany()
}


export const createPet=async({name,description,type,imageUrl}:InfoPet)=>{
    return await prisma.pet.create({
        data:{
            name,
            description,
            type,
            imageUrl

        }
    })
}


export const findPetById=async(id:number)=>{
    return await prisma.pet.findUnique({
        where:{
            id
        }
    })
}

export const updatePet=async({id,infoPet:{name,description,type,imageUrl}}:UpdateInfoPet)=>{
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


export const deletePet=async(id:number)=>{
    return await prisma.pet.delete({
        where:{
            id
        },
        
    })
}