import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

const autenticarUsuario = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    const {email, password} = req.body;
    // console.log('autenticarUsuario', email, password);
    
    try {
        // Revisar usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'Usuario no existe'});
        }

        // Revisar pass correcto
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).send({ msg: 'Usuario o contraseña incorrectos'});
        }

        // Crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.status(200).json({token});
        })

    }
    catch(error){
        console.log(error);
        res.status(400).json({error});
    }

}

// Obtiene el usuario autenticado
const usuarioAutenticado = async(req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}

export {
    autenticarUsuario,
    usuarioAutenticado
}