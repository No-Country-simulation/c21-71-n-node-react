import { Router, Request, Response } from 'express';
import { userRegister, userLogin } from '../controllers/user-controller';
import { verifyRoleAdmin, verifyToken } from '../middlewares/verify-token-berer';
import { getAllUsers, getUserById } from '../controllers/admin-controller';

const router = Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/me', verifyToken, async (_req: Request, res: Response) => {
  res.json({ mensaje: 'Hola mundo' });
});

// Refugio



// Admin

router.get('/users', verifyToken, verifyRoleAdmin,getAllUsers );
router.get('/user/:id',verifyToken, verifyRoleAdmin,getUserById)

export default router;
