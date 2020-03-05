import express from 'express';
import { autenticarUsuario, usuarioAutenticado } from '../controllers/authController';
import { check } from 'express-validator';
import auth from '../middleware/auth';

let router = express.Router();

// Iniciar sesion
// api/auth
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6})
], autenticarUsuario);

// Obtiene el usuario autenticado
router.get('/', auth, usuarioAutenticado);

export default router;