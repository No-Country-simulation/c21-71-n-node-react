import { PrismaClient } from "@prisma/client";
import { NewShelter, UpdateShelter } from "../../types";
import { passwordEncryptor } from "./password-encryptor";

const prisma=new PrismaClient()


//Create 
export const createShelterService=async({shelter_name,email,password,phone}:NewShelter)=>{

return await prisma.shelter.create({
    data:{
        shelter_name,
        email,
        password,
        phone
    }
})


}
//Read

export const getAllShelterService=async()=>{
    return await prisma.shelter.findMany()
}

export const findShelterByEmailService=async(email:string)=>{
    return await prisma.shelter.findUnique({
        where:{
            email
        }
    })
}


export const findShelterByIdService=async(id:number)=>{
    return  prisma.shelter.findUnique({
        where:{
            id
        }
    })
}

//Update 
export const updateShelterByIdService=async({id,payload:{shelter_name,email,phone,password}}:UpdateShelter)=>{
    
    let encryptedPassword=password? await passwordEncryptor(password): undefined
    return await prisma.shelter.update({
        where:{id},
        data:{
            shelter_name,
            email,
            phone,
            password:encryptedPassword
        }
    })
}

export const updateShelterByEmailService=async({userEmail,payload:{shelter_name,email,phone,password}}:{userEmail:string,payload:{shelter_name?:string,email?:string,phone?:string,password?:string}})=>{
    
    let encryptedPassword=password? await passwordEncryptor(password): undefined
    return await prisma.shelter.update({
        where:{email:userEmail},
        data:{
            shelter_name,
            email,
            phone,
            password:encryptedPassword
        }
    })
}

// Delete 
export const deleteShelterByIdService=async (id:number)=>{
    return await prisma.shelter.delete({
        where:{
            id
        }
    })
}









