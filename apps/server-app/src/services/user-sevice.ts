import { PrismaClient } from '@prisma/client';
import { ICreateUser, UpdateUser } from '../../types';
import { passwordEncryptor } from './password-encryptor';

const prisma = new PrismaClient();

// Create


export const getAllUsersService=async()=>{
  return await prisma.user.findMany()
}

export const createUser = async ({ email, firstname, lastname, phone, encryptedPassword }: ICreateUser) => {
  return await prisma.user.create({
    data: {
      email,
      firstname,
      lastname,
      phone,
      password: encryptedPassword,
      
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

export const updateUserByIdService = async ({ id, payload: { email, firstname, lastname, phone, password } }: UpdateUser) => {
  let encryptedPassword=password? await passwordEncryptor(password): undefined

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      firstname,
      lastname,
      phone,
      password:encryptedPassword,
      
    },
  });
};


export const updateUserByEmailService = async ({ userEmail, payload: { email, firstname, lastname, phone, password,  } }:{ userEmail:string, payload: { email?:string, firstname?:string, lastname?:string, phone?:string, password?:string,  } }) => {
  let encryptedPassword=password? await passwordEncryptor(password): undefined
  return await prisma.user.update({
    where: {
      email:userEmail,
    },
    data: {
      email,
      firstname,
      lastname,
      phone,
      password:encryptedPassword,
      
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
