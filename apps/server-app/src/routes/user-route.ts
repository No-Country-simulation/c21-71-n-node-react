import { Router, Request, Response } from 'express';
import { userRegister, userLogin } from '../controllers/auth-controller';
import { verifyRoleAdmin, verifyToken } from '../middlewares/verify-token-berer';
import { getAllUsers, getUserById, updateUserById } from '../controllers/user-controller';

const router = Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/me', verifyToken, async (_req: Request, res: Response) => {
  res.json({ mensaje: 'Hola mundo' });
});

// Refugio



// User

router.get('/users', verifyToken, verifyRoleAdmin,getAllUsers );
router.get('/user/:id',verifyToken, verifyRoleAdmin,getUserById)
router.put('/user/:id',verifyToken,verifyRoleAdmin,updateUserById)
router.delete('/user/:id',verifyToken,verifyRoleAdmin,)
export default router;
