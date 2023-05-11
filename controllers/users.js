const express = require('express');
const knex = require('../database/config');
const moment = require('moment/moment');

const getMyUser = async( req, res = express.response ) => {
    try {
       const [user] = await knex.select('*').from('users').where('user_id', req.user_id);

       if( !user ){
        return res.status(404).json({
            ok: false,
            msg: 'User does not exist.'
        })
       }

       res.status(200).json({
        ok: true,
        user_id: user.user_id,
        name: user.name,
        email:user.email,
        birthday: user.birthday,
        cellphone: user.cellphone
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error.'
        })
    }
}

const updateUser = async( req, res = express.response ) => {
    try {
        let [user] = await knex.select('*').from('users').where('user_id', req.user_id);
        if( !user ){
        return res.status(404).json({
            ok: false,
            msg: 'User does not exist.'
            })
        }
        user = {
            name: req.body.name,
            email:req.body.email,
            birthday: moment(req.body.birthday).utc().format('YYYY-MM-DD'),
            cellphone: req.body.cellphone
        }
       await knex('users').where('user_id', req.user_id).update(user);
        console.log(user);
       res.status(201).json({
        ok: true,
        name: user.name,
        email:user.email,
        birthday: user.birthday,
        cellphone: user.cellphone
       });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error.'
        })
    }
}

module.exports = {
    getMyUser,
    updateUser,
}