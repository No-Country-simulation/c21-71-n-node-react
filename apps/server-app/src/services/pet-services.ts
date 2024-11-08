import { PrismaClient } from '@prisma/client';
import { UpdateInfoPet } from '../../types';

const prisma = new PrismaClient();

export const getAllPetService = async () => {
  return await prisma.pet.findMany();
};

export const getPetsByShelterService=async(shelter_id:number)=>{
  return await prisma.pet.findMany({
    where:{shelterId:shelter_id}
  })
}

export const createPetService = async ({
  name,
  age,
  description,
  type,
  imageUrl,
  shelterId,
}: {
  name: string;
  age:string;
  description: string;
  type: string;
  imageUrl: {}[];
  shelterId: number;
}) => {
  return await prisma.pet.create({
    data: {
      name,
      age,
      description,
      type,
      imageUrl,
      shelterId,
    },
  });
};

export const findPetByIdService = async (id: number) => {
  return await prisma.pet.findUnique({
    where: {
      id,
    },
  });
};

export const updatePetService = async ({ id,  name,age, description, type, imageUrl  }: UpdateInfoPet) => {
  return await prisma.pet.update({
    where: {
      id,
    },
    data: {
      name,
      age,
      description,
      type,
      imageUrl,
    },
  });
};

export const deletePetService = async (id: number) => {
  return await prisma.pet.delete({
    where: {
      id,
    },
  });
};
