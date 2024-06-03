const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.post('/register', userController.Register);
router.post('/refresh-token', userController.RefreshToken);
router.post('/login', userController.Login);
router.delete('/logout', userController.Logout);

router.get('/:id', userController.GetUser);
router.get('/:id/order', userController.GetOrder);

router.patch('/:id', userController.EditUser);

router.get('/:user_id/product/:product_id/bought', userController.CheckUserBought);
router.post('/:user_id/product/:product_id/comment', userController.StoreComment);
router.delete('/:user_id/comment/:comment_id/delete', userController.DeleteComment);

module.exports = router;
