const express = require('express');
const siteController = require('../app/controllers/siteController');
const router = express.Router();

router.get('/search', siteController.search);
router.get('/:email/favorite-product', siteController.GetFavoriteProduct);
router.get('/:email/favorite-product/:id', siteController.GetFavoriteProductByID);
router.get('/category/:id/category-detail', siteController.ShowCategoryDetail);
router.get('/category-detail/:id', siteController.GetCategoryDetail);
router.get('/sort', siteController.sort);
router.get('/category', siteController.GetCategory);
router.post('/favorite-product/add', siteController.AddFavoriteProduct);
router.post('/favorite-product/delete', siteController.DestroyFavoriteProduct);

module.exports = router;