const productController=require('../controllers/product.user.controller')
const createProduct=require('../controllers/product.admin.controller')
const router = require('express').Router()
router.post("/products",createProduct.create);
router.get("/products",productController.getAllUser);
router.get("/products/:id",productController.userfindOne);
router.put("/products/:id",productController.userUpdate);
router.delete("/products/:id",productController.userDelete);
module.exports=router