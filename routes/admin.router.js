const productController=require('../controllers/product.admin.controller')
const router = require('express').Router()


router.post("/products" ,productController.create);
router.get("/products",productController.getAll);
router.get("/products/:id",productController.findOne);
router.put("/products/:id",productController.update);
router.delete("/products/:id",productController.delete);
router.delete("/products",productController.deleteAll);
router.post("/users",productController.createUser)
router.get("/productsByname/",productController.getAllByProduct)
router.get("/productsByuser/",productController.getAllByUser)
router.get("/product/sortbyratings",productController.sortbyratings)
module.exports=router
