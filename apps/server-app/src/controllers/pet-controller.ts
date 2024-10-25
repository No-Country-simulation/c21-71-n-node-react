import { Request, Response } from 'express';
import {
  createPetService,
  deletePetService,
  findPetByIdService,
  getAllPetService,
  getPetsByShelterService,
  updatePetService,
} from '../services/pet-services';
import { InfoPet, UpdateInfoPet } from '../../types';
import { MyRequest } from '../../types-back';
import { findShelterByEmailService } from '../services/shelter-service';
import { uploadImgsToCloudinary } from '../services/cloudinary-service';
import fs from 'fs'


export const getPets = async (_req: MyRequest, res: Response) => {
  try {
    const petsList = await getAllPetService();
    res.status(200).json({ ok: true, petsList });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
};

export const createPet = async (req: MyRequest, res: Response) => {
  try {
    const email = req.email;
    
    if (email) {
      const shelter = await findShelterByEmailService(email);
      if (shelter) {
        if (req.files) {
          const files = req.files as Express.Multer.File[];
          const imgs = files.map((file) => file.path);
          
          const imageUrl=await uploadImgsToCloudinary(imgs)
          const { name, description, type }: InfoPet = req.body;  
          const newPet = await createPetService({ name, description, type, imageUrl, shelterId: shelter.id });

          imgs.forEach(filePath => {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
              }
            });
          });



          res.status(201).json({ ok: true, newPet });
        }else{
          res.status(400).json({ok:false,error:'no se encontraron archivos'})
        }
        
      } else {
        res.status(404).json({ ok: false, error: 'shelter not found' });
      }
    } else {
      res.status(400).json({ ok: false, error: 'email address not provided' });
    }
  } catch (error) {
    res.status(403).json({ ok: false, error });
  }
};







export const findPetById = async (req: Request, res: Response) => {
  try {
    const findPet = await findPetByIdService(Number(req.params['id']));
    res.status(200).json({ ok: true, findPet });
  } catch (error) {
    res.status(401).json({ ok: false, error });
  }
};

export const getPetsByShelter = async (req: MyRequest, res: Response) => {
  const { email, roleId } = req;

  try {
    if (roleId === 3) {
      if (email) {
        const shelter = await findShelterByEmailService(email);
        const pets = await getPetsByShelterService(shelter!.id);
        res.status(200).json({ ok: true, pets });
      } else {
        res.status(500).json({ ok: false, error: 'no se pudo encontrar el email' });
      }
    } else if (roleId === 1) {
      const shelterId = Number(req.params['id']);

      const pets = await getPetsByShelterService(shelterId);
      res.status(200).json({ ok: true, pets });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePet = async (req: MyRequest, res: Response) => {
  try {
    const { email, roleId } = req;
    if (email) {
      const {
        id,
        infoPet: { name, description, type, imageUrl },
      }: UpdateInfoPet = req.body;
      const findShelterIdPet = await findPetByIdService(id);
      //findShelter?.shelterId
      const findShelter = await findShelterByEmailService(email);
      if (findShelterIdPet?.shelterId === findShelter?.id || roleId === 1) {
        const changeInfoPet = await updatePetService({ id, infoPet: { name, description, type, imageUrl } });
        res.status(200).json({ ok: true, changeInfoPet });
      } else {
        res.status(401).json({ ok: false, error: 'unauthorized' });
      }
    }
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params['id']);
    const dropPet = await deletePetService(id);
    res.status(200).json({ ok: true, message: 'The mascot was deleted', dropPet });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
};
