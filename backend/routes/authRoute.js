import {Login, Logout, Signup, ProtectedRoute} from "../controllers/authController.js"
import express from "express"
import {Auth} from '../middleware/authMiddleware.js'
const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Auth,Logout);
router.get('/protected', Auth, ProtectedRoute);

export default router;