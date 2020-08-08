const { User } = require('../models');
const Validator = require('validatorjs');
const bcrypt = require('bcrypt');
const pager = require('../helpers/pager')

module.exports.create = async (req, res) => {    

    try {

        const {
            name,
            lastname,
            email,
            surname,
            password
        } = req.body;

        const validation = new Validator(req.body, {
            name: 'required|string',
            lastname: 'required|string',
            email: 'required|string|email',
            surname: 'required|string',
            password: 'required|string',
        });

        if(validation.fails()) return res.json({
            message: 'invalid_params',
            errors: validation.errors.errors
        }).status(500);

        const newUser = await User.create({
            name,
            lastname,
            email,
            surname,
            password: bcrypt.hashSync(password, 9),
        });

        return res.json({
            message: 'created',
            user: newUser
        }).status(201);
        
    } catch (e) {
        
        console.log(e);

        return res.json({
            message: 'internal_error'
        }).status(500);

    }

}

module.exports.findAll = async (req, res) => {

    try {

        const {
            items,
            page
        } = req.query;

        const paginationData = pager(
            await User.count({ where: { isDeleted: 0 } }),
            page,
            items
        );

        const users = await User.findAll({
            where: {
                isDeleted: 0
            },
            limit: parseInt(paginationData.pageSize),
            offset: parseInt(paginationData.offset)
        });

        return res.json({
            users,
            paginationData
        });
        
    } catch (e) {

        console.log(e);

        return res.json({
            message: 'internal_error'
        }).status(500);
        
    }

}

module.exports.findOne = async (req, res) => {

    try {

        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        return res.json({
            user
        });
        
    } catch (e) {
        
        console.log(e);

        return res.json({
            message: 'internal_error'
        }).status(500);

    }

}

module.exports.update = async (req, res) => {

    try {

        const {
            name,
            lastname,
            email,
            surname,
            password
        } = req.body;

        const {
            id
        } = req.params;

        const validation = new Validator(req.body, {
            name: 'required|string',
            lastname: 'required|string',
            email: 'required|string|email',
            surname: 'required|string',
            password: 'required|string',
        });

        if(validation.fails()) return res.json({
            message: 'invalid_params',
            errors: validation.errors.errors
        }).status(500);

        await User.update({
            name,
            lastname,
            email,
            surname,
            password: bcrypt.hashSync(password, 9),
        }, {
            where: {
                id
            }
        });

        const user = User.findOne({
            where: {
                id
            }
        });

        return res.json({
            message: 'updated',
            user
        }).status(201);
        
    } catch (e) {

        console.log(e);

        return res.json({
            message: 'internal_error'
        }).status(500);

    }

}

module.exports.deleteOne = async (req, res) => {

    try {

        const {
            id
        } = req.params;

        await User.update({
            isDeleted: 1
        }, {
            where: {
                id
            }
        });

        const user = User.findOne({
            where: {
                id
            }
        });

        return res.json({
            message: 'deleted',
            user
        });
        
    } catch (e) {

        console.log(e);

        return res.json({
            message: 'internal_error'
        }).status(500);
        
    }

}
