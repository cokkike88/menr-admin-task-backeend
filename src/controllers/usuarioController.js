import Usuario from '../models/Usuario';
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const agregarUsuario = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try{
        let usuario;
        let {email, password} = req.body;

        // Validaciones
        usuario = await Usuario.findOne({email});

        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya exite.'});
        }

        usuario = new Usuario(req.body);
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        await usuario.save();

        // crear y firmar jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.status(200).json({ token});

        });

    }
    catch(error){
        console.log(error);
        res.status(400).send("Hubo un error");
    }
};

export {
    agregarUsuario
};