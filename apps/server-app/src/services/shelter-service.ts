import { PrismaClient } from "@prisma/client";
import { NewShelter } from "../../types";

const prisma=new PrismaClient()



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

export const findShelterByEmail=async(email:string)=>{
    return await prisma.shelter.findUnique({
        where:{
            email
        }
    })
}













