import Tarea from '../models/Tarea';
import Proyecto from '../models/Proyecto';
import { validationResult } from 'express-validator';

const crearTarea = async(req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try{
        let tarea = new Tarea(req.body);

        // Validar proyecto 
        let proyecto = await Proyecto.findById(tarea.proyecto);
        console.log('proyecto', proyecto);

        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado.'});
        }

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        tarea.save();
        res.status(200).json(tarea);

    }
    catch(error){
        console.log(error);
        res.status(500).send('Hubo un error al guardar la tarea');
    }
}

const obtenerTareas = async(req, res) => {
    try {
        // console.log('obtenerTareas', req.query);
        // console.log(req.params.proyecto);

        const {proyecto} = req.query;

        let proyectoExiste = await Proyecto.findById(proyecto).sort({creado: -1});

        if(!proyectoExiste){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        if(proyectoExiste.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        const tareas = await Tarea.find({proyecto});
        // console.log('resultado obenerTareas', tareas);
        res.status(200).json({tareas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const actualizarTarea = async(req, res) => {
    try {
        
        const {nombre, estado, proyecto} = req.body;

        let tarea = await Tarea.findOne({_id: req.params.id, proyecto});

        if(!tarea){
            return res.status(404).json({msg: 'Tarea no existe'});
        }

        let proyectoEncontrado = await Proyecto.findById(tarea.proyecto);

        if(proyectoEncontrado.creador.toString() !== req.usuario.id){
            return res.status(404).json({msg: 'No autorizado'});
        }

        let nuevaTarea = {};

        if(nombre) nuevaTarea.nombre = nombre;
        if(estado !== null && estado !== undefined) nuevaTarea.estado = estado;

        

        tarea = await Tarea.findOneAndUpdate({_id: req.params.id},{
            $set: nuevaTarea
        }, {new: true});

        res.status(200).json(tarea);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const eliminarTarea = async(req, res) => {
    try {
        const {proyecto} = req.query;
        // console.log('id, body', req.params.id, proyecto);

        let tarea = await Tarea.findOne({_id: req.params.id, proyecto});

        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrada'});            
        }

        let proyectoEncontrado = await Proyecto.findById(proyecto);

        if(proyectoEncontrado.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        await Tarea.findOneAndDelete({_id: req.params.id});

        res.status(200).json({msg: 'Tarea eliminada'});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea
}