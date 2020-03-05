import express from 'express';
let router = express.Router();
import { agregarUsuario } from '../controllers/usuarioController';
import { check } from 'express-validator';


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6})
], agregarUsuario)


export default router;