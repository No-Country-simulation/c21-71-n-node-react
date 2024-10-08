import { PrismaClient } from "@prisma/client";



const prisma=new PrismaClient()

const roles=async()=>{
    try {
        const createRoles=await prisma.role.createMany({
            data:[
                {role:"admin"},
                {role:"adoptante"},
                {role:"refugio"},

            ]
        })


        console.log('Roles creados',createRoles);
        
    } catch (error) {
        console.log(error);
        
    }
}


roles()