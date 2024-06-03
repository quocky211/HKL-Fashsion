const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const CategoryDetail = require('../models/products/category_detail');
const ProductComment = require('../models/products/product_comment');
const { HandleAddImage } = require('../../helpers/multifunction');
const client = require('../../helpers/connection_redis');

// Function to get data from cache or database
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
class ProductController {
    // GET /product/discount
    Discount(req, res, next) {
        // Product.find({ discount: { $ne: 0, $ne: null } })
        //     .exec()
        //     .then((products) => {
        //         const data = products.map(HandleAddImage);
        //         Promise.all(data).then((result) => {
        //             res.json(result);
        //         });
        //     })
        //     .catch(next);

        getDataFromCacheOrDatabase(
            'discountedProducts',
            () => Product.find({ discount: { $ne: 0, $ne: null } }),
            res,
            next,
        );
    }

    // GET /product/top-selling
    TopSelling(req, res, next) {
        // Product.aggregate([{ $sample: { size: 10 } }])
        //     .exec()
        //     .then((products) => {
        //         const data = products.map(HandleAddImage);
        //         Promise.all(data).then((result) => {
        //             res.json(result);
        //         });
        //     })
        //     .catch(next);

        getDataFromCacheOrDatabase(
            'topSellingProducts',
            () => Product.aggregate([{ $sample: { size: 10 } }]),
            res,
            next,
        );
    }

    // GET /product/new
    New(req, res, next) {
        // Product.find({})
        //     .sort({ createdAt: -1 })
        //     .limit(10)
        //     .exec()
        //     .then((products) => {
        //         const data = products.map(HandleAddImage);
        //         Promise.all(data).then((result) => {
        //             res.json(result);
        //         });
        //     })
        //     .catch(next);

        getDataFromCacheOrDatabase('newProducts', () => Product.find({}).sort({ createdAt: -1 }).limit(10), res, next);
    }

    // GET /product/:id
    GetProduct(req, res, next) {
        Product.find({ _id: req.params.id })
            .exec()
            .then((product) => {
                const data = product.map(HandleAddImage);
                Promise.all(data).then((result) => res.json(result));
            })
            .catch(next);

    }

    // GET /product/:id/product-detail?color=:slug
    ProductDetail(req, res, next) {
        if (req.query.color) {
            ProductDetail.find({ product_id: req.params.id, color: req.query.color })
                .exec()
                .then((product) => res.json(product))
                .catch(next);
        } else {
            ProductDetail.find({ product_id: req.params.id })
                .exec()
                .then((product) => res.json(product))
                .catch(next);
        }
    }

    // GET /category/:id
    Category(req, res, next) {
        Product.find({ category_id: req.params.id })
            .exec()
            .then((products) => {
                const data = products.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    res.json(result);
                });
            })
            .catch(next);
    }

    // GET /category-detail/:id
    CategoryDetail(req, res, next) {
        Product.find({ category_detail_id: req.params.id })
            .exec()
            .then((products) => {
                const data = products.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    res.json(result);
                });
            })
            .catch(next);
    }

    // GET /category-detail
    ShowCategoryDetail(req, res, next) {
        CategoryDetail.find()
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }
    // GET /product/
    ProductShow(req, res, next) {
        const query = {};
        // if (req.query.name) {
        //     query.name = { $regex: req.query.name, $options: 'i' };
        // }
        if (req.query.price) {
            if (req.query.price == 1) {
                query.price = { $lt: 100000 };
            } // giá nhỏ hơn giá được truyền từ giao diện
            if (req.query.price == 2) {
                query.price = { $lt: 300000, $gte: 100000 };
            }
            if (req.query.price == 3) {
                query.price = { $lt: 500000, $gte: 300000 };
            }
            if (req.query.price == 4) {
                query.price = { $gte: 500000 };
            }
        }
        if (req.query.category_detail_id) {
            query.category_detail_id = req.query.category_detail_id; // màu sắc phù hợp với màu được truyền từ giao diện
        }

        const page = req.query.page || 1;
        Product.paginate(query, { page: page, limit: 16, populate: { path: 'category_detail_id', select: 'name' } })
            .then((products) => {
                const data = products.docs.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    res.json({
                        result,
                        totalDocs: products.totalDocs,
                        limit: products.limit,
                        totalPages: products.totalPages,
                        page: products.page,
                        pagingCounter: products.pagingCounter,
                        hasPrevPage: products.hasPrevPage,
                        hasNextPage: products.hasNextPage,
                        prevPage: products.prevPage,
                        nextPage: products.nextPage,
                    });
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // GET /product/:id/comment
    ShowComment(req, res, next) {
        ProductComment.find({ product_id: req.params.id })
            .populate({ path: 'user_id', select: 'name' })
            .exec()
            .then((productComments) => res.json(productComments));
    }

    // GET /product/:id/count-comment
    CountComment(req, res, next) {
        //     ProductComment.countDocuments({ product_id: req.params.id }).then((qty) => {
        //         ProductComment.aggregate([{ $match: '$product_id' }], {
        //             $group: {
        //                 _id: null,
        //                 avgStar: { $avg: '$star' },
        //             },
        //         })
        //             .exec()
        //             .then((avgStar) => {
        //                 res.json({
        //                     qty,
        //                     avgStar,
        //                 });
        //             });
        //     });
        // }

        ProductComment.find({ product_id: req.params.id })
            .exec()
            .then((comments) => {
                const qtyCmt = comments.length;
                let totalStar = 0;
                for (let i = 0; i < qtyCmt; i++) {
                    totalStar += comments[i].star;
                }
                const avgStar = (totalStar / qtyCmt).toFixed(2);
                res.json({
                    avgStar: parseFloat(avgStar),
                    qtyCmt,
                });
            });
    }
    // DELETE /product/:id/comment
    // DeleteComment(req, res, next) {
    //     ProductComment.find({ product_id: req.params.id })
    //         .populate({ path: 'user_id', select: 'name' })
    //         .exec()
    //         .then((productComments) => res.json(productComments));
    // }
}
//đoạn code sắp xếp theo giá - sẽ chèn vào giao diện
// function sortProducts(sortOrder) {
//     axios.get('/products', {
//         params: {
//           sortBy: 'price',
//           sortOrder: sortOrder
//         }
//       })
//       .then((response) => {
//         console.log(response.data);
//         // Xử lý dữ liệu trả về và hiển thị danh sách sản phẩm đã sắp xếp
//       })
//       .catch((error) => {
//         console.log(error);
//       });
// }

module.exports = new ProductController();
// export default SiteController;
