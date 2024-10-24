import { PrismaClient } from '@prisma/client';
import { ICreateUser, UpdateUser } from '../../types';

const prisma = new PrismaClient();

// Create


export const getAllUsersService=async()=>{
  return await prisma.user.findMany()
}

export const createUser = async ({ email, firstname, lastname, phone, password }: ICreateUser) => {
  return await prisma.user.create({
    data: {
      email,
      firstname,
      lastname,
      phone,
      password,
      
    },
  });
};

// Read and find

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

// Update user

export const updateUserByIdService = async ({ id, payload: { email, firstname, lastname, phone, password, roleId } }: UpdateUser) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      firstname,
      lastname,
      phone,
      password,
      roleId,
    },
  });
};

// Delete user

export const deleteUserByIdService = async (id: number) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};
