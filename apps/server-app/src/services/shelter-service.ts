import { PrismaClient } from "@prisma/client";
import { NewShelter, UpdateShelter } from "../../types";

const prisma = new PrismaClient();

//Create
export const createShelterService = async ({ shelter_name, email, password, phone }: NewShelter) => {
  return await prisma.shelter.create({
    data: {
      shelter_name,
      email,
      password,
      phone,
    },
  });
};
//Read

export const getAllShelterService = async () => {
  return await prisma.shelter.findMany();
};

export const findShelterByEmailService = async (email: string) => {
  return await prisma.shelter.findUnique({
    where: {
      email,
    },
  });
};

export const findShelterByIdService = async (id: number) => {
  return await prisma.shelter.findUnique({
    where: {
      id,
    },
  });
};

//Update
export const updateShelterByIdService = async () => {
  // Todo Crear los tipos y el esquema para validar que vengan los datos
};

// Delete
export const deleteShelterByIdService = async (id: number) => {
  return await prisma.shelter.delete({
    where: {
      id,
    },
  });
};
