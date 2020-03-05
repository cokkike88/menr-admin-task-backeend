import Proyecto from '../models/Proyecto';
import { validationResult } from 'express-validator';

const crearProyecto = async(req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try{
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.status(200).json(proyecto);
    }
    catch(error){
        res.status(500).send('Hubo un error');
    }
}

const obtenerProyectos = async (req, res) => {
    try{
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});
        res.status(200).json({proyectos});
    }
    catch(error){
        console.log(error);
        res.status(400).json({msg: 'Error al obtener proyectos'});
    }
}

const actualizarProyecto = async(req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    let nuevoProyecto = {};
    const { nombre } = req.body;

    if(nombre) {
        nuevoProyecto.nombre = nombre;
    }    

    try{
        // Revisar ID
        let proyecto = await Proyecto.findById(req.params.id);
        // Si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // Verificar el creador
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        // Modificar el proyecto
        proyecto = await Proyecto.findOneAndUpdate({_id: req.params.id },{ 
            $set: nuevoProyecto
        }, {new: true});

        res.status(200).json(proyecto);
    }
    catch(error){
        console.log(error);
        res.status(400).json({msg: 'Error al modificar el proyecto'});
    }
}

const eliminarProyecto = async(req, res) => {

    try {
        // Revisar ID
        let proyecto = await Proyecto.findById(req.params.id);

        if(!proyecto){
            return res.status(400).json({msg: 'Proyecto no encontrado'});
        }

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        await Proyecto.findOneAndDelete({_id: req.params.id});
        res.json({msg: 'Proyecto eliminado'})

        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

export {
    crearProyecto,
    obtenerProyectos,
    actualizarProyecto,
    eliminarProyecto
}