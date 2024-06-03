const httpError = require('http-errors');
const { userValidate, loginValidate, phoneValidate } = require('../../helpers/validation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helpers/jwt_service');
const client = require('../../helpers/connection_redis');
const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');
const User = require('../models/user/user');
const ProductComment = require('../models/products/product_comment');
class UserController {
    async Register(req, res, next) {
        try {
            const { email } = req.body;

            const { error } = userValidate(req.body);

            if (error) {
                throw httpError(error.details[0].message);
            }
            const isExistEmail = await User.findOne({ email: email });

            if (isExistEmail) throw httpError.Conflict(`${email} đã được đăng ký!!`);

            const formData = {
                email: req.body.email,
                gender: req.body.gender,
                password: req.body.password,
                birthday: req.body.birthday,
                address: req.body.address,
                name: req.body.name,
                phone: req.body.phone,
                level: req.body.level,
            };
            const user = new User(formData);
            user.save()
                .then(() => {
                    res.status(201).json({
                        message: "Đăng ký thành công",
                    });
                })
                .catch(() => {
                    res.status(400).send('Đăng ký tài khoản thất bại');
                });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    async RefreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw httpError.BadRequest();

            // verify token
            const { userId } = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId);
            const refToken = await signRefreshToken(userId);

            res.json({
                accessToken,
                refreshToken: refToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async Login(req, res, next) {
        try {
            const { error } = loginValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw httpError.NotFound(`${req.body.email} chưa được đăng ký!!`);
            }

            const isValidPassword = await user.isCheckPassword(req.body.password);
            if (!isValidPassword) {
                throw httpError.Unauthorized();
            }

            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            res.json({
                accessToken,
                refreshToken,
                user,
            });
        } catch (error) {
            next(error);
        }
    }
    async Logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw httpError.BadRequest();

            const { userId } = await verifyRefreshToken(refreshToken);
            client.del(userId.toString(), (err, reply) => {
                if (err) throw httpError.InternalServerError();

                res.json({
                    message: 'Logout',
                });
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /user/:id
    GetUser(req, res, next) {
        User.find({ _id: req.params.id }, 'email name gender address birthday phone')
            .exec()
            .then((user) => res.json(user))
            .catch(next);
    }

    // GET /user/:id/order
    GetOrder(req, res, next) {
        Order.find({ user_id: req.params.id })
            .exec()
            .then((order) => res.json(order))
            .catch(next);
    }

    // PATCH /user/:id
    async EditUser(req, res, next) {
        try {
            const { error } = phoneValidate(req.body);

            if (error) {
                throw httpError.Conflict('Số điện thoại không hợp lệ');
            }

            await User.updateOne({ _id: req.params.id }, req.body)
                .then(() => {
                    res.send('Cập nhật dữ liệu thành công');
                    // Xóa cache người dùng khỏi Redis
                    client.del(`user:${req.params.id}`, (err) => {
                        if (err) throw err;
                        else console.log('Đã xóa cache người dùng khỏi Redis');
                    });
                })
                .catch(() => res.send('Cập nhật dữ liệu thất bại'));
        } catch (error) {
            next(error);
        }
    }

    // POST /user/:user_id/product/:product_id
    async StoreComment(req, res, next) {
        try {
            const formData = {
                user_id: req.params.user_id,
                product_id: req.params.product_id,
                star: req.body.star,
                message: req.body.message,
            };

            const productComment = new ProductComment(formData);
            await productComment.save();
        } catch (error) {
            next(error);
        }
    }

    //GET /user/:user_id/product/:product_id/bought
    CheckUserBought(req, res, next) {
        const { user_id, product_id } = req.params;
        Order.find({ user_id: user_id })
            .exec()
            .then((orders) => {
                const data = orders.map(HandleFindProduct);
                Promise.all(data).then((result) => res.json(result));
            });

        function HandleFindProduct(order) {
            return OrderDetail.find({ order_id: order._id, product_id: product_id })
                .exec()
                .then((bought) => {
                    if (bought.length > 0) return 1;
                    return 0;
                });
        }
    }

    //DELETE /user/:user_id/comment/:comment_id/delete
    DeleteComment(req, res, next) {
        const { user_id, comment_id } = req.params;
        ProductComment.deleteOne({ _id: comment_id, user_id: user_id })
            .exec()
            .then(() => res.json({ status: 'success' }))
            .catch((e) => res.status(500).json({ error: e.message }));
    }
}

module.exports = new UserController();
