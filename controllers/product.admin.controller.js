const { where, Sequelize } = require('sequelize');
const db = require('../models/productmodel')
const userdb = require('../models/usermodels')
const Op = Sequelize.Op;


//Create and Save a new product
exports.create = async (req, res) => {
    try {

        // const { id,name, description, published, image, price, rating } = req.body
        const value = {
            id: req.body.id,
            productname: req.body.productname,
            description: req.body.description,
            published: req.body.published,
            image: req.body.image,
            price: req.body.price,
            rating: req.body.rating,
            userid: req.user.id,
            // userid:req.user.id
        }
        const data = await db.create(value)
        return await res.status(200).send(data)
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};
//get all products which existing
exports.getAll = async (req, res) => {
    try {
        const data = await db.findAll()

        return await res.json({ data })
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};
//find the specific product by id
exports.findOne = async (req, res) => {
    try {

        const val = req.params.id;
        const data = await db.findAll({ where: { id: req.user.id } })
        return await res.json({ data })
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};
//update the specific product by id
exports.update = async (req, res) => {
    try {
        const val = req.params.id;
        const data = await db.update(req.body, { where: { id: val } })
        return await res.json({ data })
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};
//delete the specific product by id
exports.delete = async (req, res) => {
    const varId = req.params.id;
    try {
        const data = await db.destroy({ where: { id: varId } });
        res.status(200).json(data);
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};
//delete all product stored
exports.deleteAll = async (req, res) => {
    try {
        const data = await db.destroy({ where: {} });
        res.status(200).json(data);
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};


exports.createUser = async (req, res) => {
    try {
        const { id, firstName, email } = req.body
        const data = await userdb.create(req.body)
        return await res.status(200).send(data)
    } catch (error) {
        return await res.status(500).send(error.message)
    }

};


exports.getAllByProduct = async (req, res) => {
    try {
        const { page, limit, search } = req.query;

        let offset = (page - 1) * limit;
        let results = await db.findAll({
            limit: limit,
            offset: offset,
            order: [
                ['createdAt', 'DESC']
            ],
            where:
            {
                productname: { [Op.like]: `%${search}%` }
            }
        });
        const totalCount = await db.count({});
        let pages = Math.ceil(totalCount / limit);
        return await res.json({
            'data': results,
            'count': results.length,
            'pages': pages,
            'totalCount': totalCount
        })
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};


exports.getAllByUser = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        let offset = (page - 1) * limit;
        let results = await userdb.findAll({
            include: [{
                model: db
            }],
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            where: {
                username: { [Op.like]: `%${search}%` }
            }

        });
        const totalCount = await db.count({});
        let pages = Math.ceil(totalCount / limit);
        return await res.json({
            'data': results,
            'count': results.length,
            'pages': pages,
            'totalCount': totalCount
        })
        // const data=await db.findAll({


        //   })
        //   return await res.status(200).send(data)

    } catch (error) {
        return await res.status(500).send(error.message)
    }
}


exports.sortbyratings=async (req,res)=>{
    try {
        const {rating}=req.query;
        if (rating==null )
        {
            const data = await db.findAll({
                order:[
                    ["rating",'asc']
                ]
            });
            res.status(200).json(data);
        }else{
            const data = await db.findAll({
                order:[
                    ["rating",rating]
                ]
            });
            res.status(200).json(data);
        }
       
    } catch (error) {
        return await res.status(500).send(error.message)
    }
}