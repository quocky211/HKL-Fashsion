const httpError = require('http-errors');

const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const User = require('../models/user/user');
const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');
const { userValidate } = require('../../helpers/validation');
const { TestGetListUser } = require('./userController');
const client = require('../../helpers/connection_redis');
const cloudinary = require('cloudinary').v2;

// const ProductDetail = require('../models/products/product_detail');
// const CategoryDetail = require('../models/products/category_detail');

function getDataFromCacheOrDatabase(cacheKey, databaseQuery, res, next) {
    // Check if data is in Redis cache
    client.get(cacheKey, (err, cachedData) => {
        if (err) {
            console.error('Error retrieving data from Redis cache:', err);
            return next(err);
        }

        if (cachedData) {
            // If cached data exists, send it as the response
            console.log('Data retrieved from Redis cache');
            const parsedData = JSON.parse(cachedData);
            return res.json(parsedData);
        }

        // If not in cache, query the database
        databaseQuery()
            .exec()
            .then((products) => {
                const data = products.map(HandleAddImage);

                // Use Promise.all to wait for all asynchronous operations to complete
                Promise.all(data).then((result) => {
                    // Send the response
                    res.json(result); // Sending the result, not the original 'data'
                    console.log('Data cached in Redis');

                    // Save result to Redis cache
                    client.setex(cacheKey, 300, JSON.stringify(result)); // Set expiration time to 1 minute
                });
            })
            .catch(next);
    });
}

// Function to delete an array of cache keys
function deleteCacheKeys(cacheKeys) {
    const cacheDeletions = cacheKeys.map((cacheKey) => {
        return new Promise((resolve) => {
            client.del(cacheKey, (err, numRemoved) => {
                if (err) {
                    console.error(`Redis cache error for key ${cacheKey}:`, err);
                }
                console.log(`Cleared cache for ${numRemoved} key(s)`);
                resolve();
            });
        });
    });

    // Return a Promise that resolves when all cache deletions are complete
    return Promise.all(cacheDeletions);
}

function HandleAddImage(product) {
    return ProductDetail.find({ product_id: product._id })
        .exec()
        .then((productDetails) => {
            return {
                product,
                path: productDetails[0]?.path,
            };
        });
}

const cacheKeysToDelete = ['topSellingProducts', 'discountedProducts', 'newProducts', 'allProductsAdmin'];

class AdminController {
    // GET /admin/product
    ShowProduct(req, res, next) {
        // Product.find({})
        //     .populate({ path: 'category_detail_id', select: 'name' })
        //     .exec()
        //     .then((products) => {
        //         const data = products.map(HandleAddImage);
        //         Promise.all(data).then((result) => {
        //             res.json(result);
        //         });
        //     });

        const cacheKey = 'allProductsAdmin'; // Unique cache key for all products

        getDataFromCacheOrDatabase(
            cacheKey,
            () => Product.find({}).populate({ path: 'category_detail_id', select: 'name' }),
            res,
            next,
        );
    }

    // GET /admin/product/:id/product-detail
    ShowProductDetail(req, res, next) {
        ProductDetail.find({ product_id: req.params.id })
            .exec()
            .then((productDetail) => res.json(productDetail))
            .catch(next);
    }

    // POST /admin/product/store
    StoreProduct(req, res, next) {
        // const cacheKey = 'newProducts';

        // // Clear the cached data for the updated product
        // client.del(cacheKey, (err, numRemoved) => {
        //     if (err) {
        //         console.error('Redis cache error:', err);
        //     }
        //     console.log(`Cleared cache for ${numRemoved} key(s)`);
        //     // Proceed with updating the product
        //     const product = new Product(req.body);
        //     product
        //         .save()
        //         .then(() => {
        //             res.send('THÊM SẢN PHẨM THÀNH CÔNG');
        //         })
        //         .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
        // });

        deleteCacheKeys(cacheKeysToDelete)
            .then(() => {
                console.log('Cache keys deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting cache keys:', error);
            });

        // Proceed with updating the product
        const product = new Product(req.body);
        product
            .save()
            .then(() => {
                res.send('THÊM SẢN PHẨM THÀNH CÔNG');
            })
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }

    // POST /admin/product-detail/store

    // StoreProductDetail(req, res, next) {
    //     const fileData = req.file;
    //     const data = {
    //         product_id: Number(req.body.product_id),
    //         color: req.body.color,
    //         size: req.body.size,
    //         qty: Number(req.body.qty),
    //     };
    //     console.log({ ...data, path: fileData.path });

    //     const productDetail = new ProductDetail({ ...data, path: fileData.path });
    //     productDetail
    //         .save()
    //         .then(() => res.send('THÊM CHI TIẾT SẢN PHẨM THÀNH CÔNG'))
    //         .catch((err) => {
    //             console.log(err);
    //             if (fileData) cloudinary.uploader.destroy(fileData.filename);
    //             res.send('THÊM KHÔNG THÀNH CÔNG');
    //         });
    // }

    StoreProductDetail(req, res, next) {
        const fileData = req.file;
        const data = {
            product_id: Number(req.body.product_id),
            color: req.body.color,
            size: req.body.size,
            qty: Number(req.body.qty),
        };

        console.log({ ...data, path: fileData.path });

        const productDetail = new ProductDetail({ ...data, path: fileData.path });
        productDetail
            .save()
            .then(() => {
                // Clear the cached data for specific keys related to product details

                return deleteCacheKeys(cacheKeysToDelete)
                    .then(() => {
                        res.send('THÊM CHI TIẾT SẢN PHẨM THÀNH CÔNG');
                    })
                    .catch(() => {
                        res.send('THÊM CHI TIẾT SẢN PHẨM THÀNH CÔNG, NHƯNG LỖI KHI XÓA CACHE');
                    });
            })
            .catch((err) => {
                console.log(err);
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                res.send('THÊM KHÔNG THÀNH CÔNG');
            });
    }

    // Delete ProductDetail
    // DeleteProductDetail(req, res, next) {
    //     const productDetailID = req.params.id;
    //     console.log(productDetailID);
    //     ProductDetail.deleteOne({ _id: productDetailID })
    //         .then(() => res.send('Xóa chi tiết sản phẩm thành công'))
    //         .catch(() => res.send('Xóa chi tiết sản phẩm thất bại'));
    // }

    DeleteProductDetail(req, res, next) {
        const productDetailID = req.params.id;

        ProductDetail.deleteOne({ _id: productDetailID })
            .then(() => {
                // Clear the cached data for specific keys related to product details

                return deleteCacheKeys(cacheKeysToDelete)
                    .then(() => {
                        res.send('Xóa chi tiết sản phẩm thành công');
                    })
                    .catch(() => {
                        res.send('Xóa chi tiết sản phẩm thành công, nhưng lỗi khi xóa cache');
                    });
            })
            .catch(() => res.send('Xóa chi tiết sản phẩm thất bại'));
    }

    // PUT /admin/product/:id
    // UpdateProduct(req, res, next) {
    //     const productId = req.params.id;

    //     // Proceed with updating the product
    //     Product.updateOne({ _id: productId }, req.body)
    //         .exec()
    //         .then(() => res.send('Update sản phẩm thành công'))
    //         .catch(() => res.send('Update sản phẩm thất bại'));
    // }

    UpdateProduct(req, res, next) {
        const productId = req.params.id;

        // Proceed with updating the product
        Product.updateOne({ _id: productId }, req.body)
            .exec()
            .then(() => {
                // Clear the cached data for specific keys related to the updated product

                return deleteCacheKeys(cacheKeysToDelete)
                    .then(() => {
                        res.send('Update sản phẩm thành công');
                    })
                    .catch(() => {
                        res.send('Update sản phẩm thành công, nhưng lỗi khi xóa cache');
                    });
            })
            .catch(() => res.send('Update sản phẩm thất bại'));
    }

    // delete /admin/product/delete/:id
    // DestroyProduct(req, res, next) {
    //     const productId = req.params.id;

    //     // Proceed with updating the product
    //     Product.deleteOne({ _id: productId })
    //         .exec()
    //         .then(() => res.send('Xóa sản phẩm thành công'))
    //         .catch(() => res.send('Xóa sản phẩm thất bại'));
    // }

    DestroyProduct(req, res, next) {
        const productId = req.params.id;

        // Proceed with updating the product
        Product.deleteOne({ _id: productId })
            .exec()
            .then(() => {
                return deleteCacheKeys(cacheKeysToDelete)
                    .then(() => {
                        res.send('Xóa sản phẩm thành công');
                    })
                    .catch(() => {
                        res.send('Xóa sản phẩm thành công, nhưng lỗi khi xóa cache');
                    });
            })
            .catch(() => res.send('Xóa sản phẩm thất bại'));
    }

    // GET /admin/user/show
    ShowUser(req, res, next) {
        User.find({ level: false })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => next(err));
    }

    // POST /admin/user/store
    async StoreUser(req, res, next) {
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
                avatar: req.body.avatar,
                level: req.body.level,
            };
            const user = new User(formData);
            user.save()
                .then(() => {
                    res.send('Thêm người dùng thành công');
                })
                .catch(() => res.send('Thêm người dùng thất bại'));
        } catch (error) {
            next(error);
        }
    }

    // PUT /admin/user/edit/:id
    EditUser(req, res, next) {
        const userId = req.params.id;
        const cacheKey = `user:${userId}`;
        client.del(cacheKey, (err, numRemoved) => {
            if (err) throw err;
            console.log(`Cleared cache for ${numRemoved} key(s)`);
            User.updateOne({ _id: userId }, req.body)
                .exec()
                .then(() => res.send('Update người dùng thành công'))
                .catch(() => res.send('Update người dùng thất bại'));
        });
    }

    // DELETE /admin/user/delete/:id
    DestroyUser(req, res, next) {
        const userId = req.params.id;
        const cacheKey = `user:${userId}`;
        client.del(cacheKey, (err, numRemoved) => {
            if (err) throw err;
            console.log(`Cleared cache for ${numRemoved} key(s)`);
            User.deleteOne({ _id: userId })
                .exec()
                .then(() => res.send('Xóa người dùng thành công!!'))
                .catch(() => res.send('Xóa người dùng thất bại!!'));
        });
    }

    ShowOrder(req, res, next) {
        Order.find()
            .then((order) => {
                res.json(order);
            })
            .catch((err) => next(err));
    }

    ShowOrderDetail(req, res, next) {
        OrderDetail.find({ order_id: req.params.id })
            .exec()
            .then((orderDetail) => res.json(orderDetail))
            .catch(next);
    }

    // PUT /admin/order/:id/change-status
    async ChangeStatusOrder(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const order = await Order.findById(id);
            if (!order)
                res.status(404).json({
                    error: 'Không tìm thấy hóa đơn',
                });

            order.status = status;
            await order.save();

            res.status(200).json({ message: 'Successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Lỗi server',
            });
        }
    }

    // DELETE /admin/order/:id/delete
    async DeleteOrder(req, res) {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) res.status(404).json({ error: 'Không tìm thấy hóa đơn' });

        try {
            await OrderDetail.deleteMany({ order_id: order._id });
            await order.remove();
            res.status(200).json({ message: 'Successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    }

    async Revenue(req, res) {
        try {
            const year = req.query.year || 2023; // Năm cần lấy doanh thu
            const pipeline = [
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(year, 0, 1), // Ngày bắt đầu của năm
                            $lt: new Date(parseInt(year) + 1, 0, 1), // Ngày bắt đầu của năm tiếp theo
                        },
                    },
                },
                {
                    $group: {
                        _id: { month: { $month: '$createdAt' } },
                        revenue: { $sum: '$total' },
                    },
                },
            ];

            const result = await Order.aggregate(pipeline);
            res.json(result);
        } catch (error) {
            console.error(error);
            req.status(500).json({ error: 'Lỗi server' });
        }
    }
}

module.exports = new AdminController();

// export default SiteController;
