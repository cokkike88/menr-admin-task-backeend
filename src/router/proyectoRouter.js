import express from 'express';
import { check } from 'express-validator';
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } from '../controllers/proyectoController';
import auth from '../middleware/auth';

let router = express.Router();

router.post('/', auth, [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], crearProyecto);

router.get('/', auth, obtenerProyectos);

router.put('/:id', auth,[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], actualizarProyecto);

router.delete('/:id', auth, eliminarProyecto);

export default router;