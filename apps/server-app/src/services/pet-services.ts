import { PrismaClient } from '@prisma/client';
import { UpdateInfoPet } from '../../types';

const prisma = new PrismaClient();

export const getAllPetService = async () => {
  return await prisma.pet.findMany();
};

export const createPetService = async ({
  name,
  description,
  type,
  imageUrl,
  shelterId,
}: {
  name: string;
  description: string;
  type: string;
  imageUrl: string[];
  shelterId: number;
}) => {
  return await prisma.pet.create({
    data: {
      name,
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

export const updatePetService = async ({ id, infoPet: { name, description, type, imageUrl } }: UpdateInfoPet) => {
  return await prisma.pet.update({
    where: {
      id,
    },
    data: {
      name,
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
