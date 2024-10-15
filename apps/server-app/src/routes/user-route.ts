import { Router, Request, Response } from 'express';
import { userRegister, userLogin } from '../controllers/auth-controller';
import { verifyRoleAdmin, verifyToken, verifyRoleRefugio } from '../middlewares/verify-token-berer';
import { getAllUsers, getUserById, updateUserById } from '../controllers/user-controller';
import { createPet, deletePet, findPetById, getPets, updatePet } from '../controllers/pet-controller';


const router = Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/me', verifyToken, async (_req: Request, res: Response) => {
  res.json({ mensaje: 'Hola mundo' });
});

// User

router.get('/users', verifyToken, verifyRoleAdmin, getAllUsers);
router.get('/user/:id', verifyToken, verifyRoleAdmin, getUserById)
router.put('/user/:id', verifyToken, verifyRoleAdmin, updateUserById)
router.delete('/user/:id', verifyToken, verifyRoleAdmin,)

// pets

router.get('/pets', getPets)
router.get('/pet/:id', verifyToken, findPetById)
router.post('/pet', verifyToken, verifyRoleRefugio, createPet)
router.put('/pet', verifyToken, verifyRoleRefugio, updatePet)
router.delete('/pet/:id', verifyToken, verifyRoleRefugio, deletePet)

export default router;
