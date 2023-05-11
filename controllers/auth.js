const express = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const knex = require('../database/config');
const moment = require('moment/moment');

const crearUsuario = async(req, res = express.response) => {

    const { email, password, birthday, cellphone, name } = req.body

    try {
        let [user_id] = await knex.select('user_id').from('users').where('email', email);

        if ( user_id ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con este correo'
            })
        }

        let user = {
            name,
            email,
            birthday: moment(birthday).utc().format('YYYY-MM-DD'),
            cellphone,
            password
        }

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync( password, salt );
    
        // Crear usuario
        [ user_id ] = await knex('users').insert(user);

        // Buscar usuario porque mysql knex no soporta return
        [user] = await knex.select('*').from('users').where('user_id', user_id)
        
        // Crearle un account
        await knex('account').insert({
            user_id: user.user_id,
            balance: 0,
        });

        //Generar JWT
        const token = await generarJWT( user.user_id, user.name );
    
        res.status(201).json({
            ok: true,
            user_id: user.user_id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error.'
        })
    }
}

const loginUsuario = async(req, res = express.response) => {
    
    const { email, password } = req.body

    try {
        const [user] = await knex('users').select('*').where('email', email);

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar JWT
        const token = await generarJWT( user.user_id, user.name );

        res.status(200).json({
            ok: true,
            user_id: user.user_id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error.'
        });
    }
}

const revalidarToken = async(req, res = express.response) => {

    const { user_id, name } = req

    const token = await generarJWT( user_id, name );

    res.json({
        ok: true,
        user_id, name,
        token
    })
}

module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario,
}