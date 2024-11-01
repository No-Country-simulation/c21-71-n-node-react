import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/auth-controller';
import { verifyRoleAdmin, verifyToken, verifyRoleRefugio, verifyRoleAdoptante } from '../middlewares/verify-token-berer';
import { getAllUsers, getUserById, deleteUserById, updateUser } from '../controllers/user-controller';
import { createPet, deletePet, findPetById, getPets, getPetsByShelter, updatePet } from '../controllers/pet-controller';
import { deleteShelter, getAllShelters, getShelter, updateShelter } from '../controllers/shelter-controller';
import multer from 'multer';

import swaggerUI from 'swagger-ui-express';
import specs from '../../swagger/swagger';



const router = Router();
// para documentacion de swagger
router.use('/api-docs', swaggerUI.serve)
router.get('/api-docs', swaggerUI.setup(specs));

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, async (_req: Request, res: Response) => {
  res.json({ mensaje: 'Hola mundo' });
});

// User

router.get('/users', verifyToken, verifyRoleAdmin, getAllUsers);
router.get('/user/:id', verifyToken, verifyRoleAdmin, getUserById)

router.put('/user', verifyToken, verifyRoleAdoptante, updateUser)
router.delete('/user/:id',verifyToken,verifyRoleAdmin,deleteUserById)




const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_req:Request, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único para cada archivo
  },
});

const storageUpdate=multer.diskStorage({
  destination:'./updateloads',
  filename: (_req:Request, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único para cada archivo
  }
})
const upload=multer({storage})

const updateLoads=multer({storage:storageUpdate})

// pets

router.get('/pets', getPets)
router.get('/pet/:id', verifyToken, findPetById)
router.post('/pet', verifyToken, verifyRoleRefugio,upload.array("image", 3), createPet)
router.put('/pet', verifyToken, verifyRoleRefugio,updateLoads.array("image", 3), updatePet)
router.delete('/pet/:id', verifyToken, verifyRoleRefugio, deletePet)

// Shelters 

router.get('/shelters',verifyToken,verifyRoleAdmin,getAllShelters)
router.get('/pets-by-shelter',verifyToken,verifyRoleRefugio,getPetsByShelter)
router.get('/pets-by-shelter/:id',verifyToken,verifyRoleRefugio,getPetsByShelter)
router.get('/shelter/:id',verifyToken,getShelter)
router.put('/shelter',verifyToken,verifyRoleRefugio,updateShelter)
router.delete('/shelter/:id',verifyToken,verifyRoleRefugio,deleteShelter)

export default router;
