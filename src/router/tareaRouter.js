import express from 'express';
import { check } from 'express-validator';
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } from '../controllers/tareaController';
import auth from '../middleware/auth';

let router = express.Router();

router.post('/', auth, [
    check('nombre', "El nombre de la tarea es obligatoria").not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
], crearTarea);

router.get('/tareas_proyecto', auth, obtenerTareas);

router.put('/:id', [
    check('nombre', "El nombre de la tarea es obligatoria").not().isEmpty(),
    check('estado', "El estado de la tarea es obligatoria").not().isEmpty()
], auth, actualizarTarea);

router.delete('/:id', auth, eliminarTarea);


export default router;