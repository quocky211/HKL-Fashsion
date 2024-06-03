const express = require('express');
const adminController = require('../app/controllers/adminController');
const router = express.Router();
const uploadCloud = require('../helpers/uploader.js');
const verifyAccessToken = require('../middleware/verifyAccessToken.js');

router.use(verifyAccessToken);
// product
router.get('/product', adminController.ShowProduct);
router.get('/product/:id/product-detail', adminController.ShowProductDetail);
router.post('/product/store', adminController.StoreProduct);
router.post('/product-detail/store', uploadCloud.single('path'), adminController.StoreProductDetail);
router.put('/product/edit/:id', adminController.UpdateProduct);
router.delete('/product/delete/:id', adminController.DestroyProduct);
router.delete('/product-detail/delete/:id', adminController.DeleteProductDetail);

// user
router.get('/user/show', adminController.ShowUser);
router.post('/user/store', adminController.StoreUser);
router.put('/user/edit/:id', adminController.EditUser);
router.delete('/user/delete/:id', adminController.DestroyUser);

// order /order/:id/order-detail
router.get('/order/show', adminController.ShowOrder);
router.get('/order/:id/order-detail', adminController.ShowOrderDetail);
router.put('/order/:id/change-status', adminController.ChangeStatusOrder);
router.delete('/order/:id/delete', adminController.DeleteOrder);
router.get('/revenue', adminController.Revenue);

module.exports = router;
