import { PrismaClient } from "@prisma/client";
import { passwordEncryptor } from "../services/password-encryptor";



const prisma=new PrismaClient()

const createUserAdminService=async()=>{
    let encryptedPassword=await passwordEncryptor('admin123456')
    try {
        const createUserAdmin=await prisma.user.create({
            data:{
                email:"node-react@admin.com",
                firstname:"admin",
                lastname:"admin-admin",
                phone:"12345678",
                roleId:1,
                password:encryptedPassword
            }
        })


        console.log('user admin created',createUserAdmin);
        
    } catch (error) {
        console.log(error);
        
    }
}


createUserAdminService()