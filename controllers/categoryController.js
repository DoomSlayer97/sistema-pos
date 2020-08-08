const { Category } = require('../models');
const Validator = require('validatorjs');
const pager = require('../helpers/pager')

module.exports.create = async (req, res) => {

    try {

        const {
            name
        } = req.body;

        const validator = new Validator(req.body, {
            name: 'required|string'
        });

        if(validator.fails()) return res.json({
            message: 'invalid_params',
            errors: validator.errors.errors
        });

        const category = await Category.create({
            name
        });

        return res.json({
            message: 'created',
            category
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
            await Category.count({ where: {isDeleted: 0}}),
            page,
            items
        );

        const categories = await Category.findAll({
            where: {
                isDeleted: 0
            },
            limit: parseInt(paginationData.pageSize),
            offset: parseInt(paginationData.offset)
        });

        return res.json({
            categories,
            paginationData
        });
        
    } catch (e) {
        
        console.log(e);

        return res.json({
            message: 'internal_error'
        }).status(500);

    }

}


