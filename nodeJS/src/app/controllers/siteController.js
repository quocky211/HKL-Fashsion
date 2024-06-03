const Product = require('../models/products/product');
const Category = require('../models/products/category');
const CategoryDetail = require('../models/products/category_detail');
const ProductFavorite = require('../models/products/product_favorite');
const { HandleAddImage } = require('../../helpers/multifunction');
class SiteController {
    // GET /category
    GetCategory(req, res, next) {
        Category.find({})
            .exec()
            .then((category) => res.json(category))
            .catch(next);
    }

    // GET /category/:id/category-detail
    ShowCategoryDetail(req, res, next) {
        CategoryDetail.find({ category_id: req.params.id })
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }
    // GET /category-detail/:id
    GetCategoryDetail(req, res, next) {
        CategoryDetail.find({ _id: req.params.id })
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }
    //GET /:email/favorite-product
    GetFavoriteProduct(req, res, next) {
        ProductFavorite.find({ email: req.params.email })
            .populate({ path: 'product_id', select: 'name price' })
            .exec()
            .then((favoriteProduct) => res.json(favoriteProduct))
            .catch(next);
    }

    //GET /:email/favorite-product/:id
    GetFavoriteProductByID(req, res, next) {
        ProductFavorite.findOne({ email: req.params.email, product_id: req.params.id })
            .exec()
            .then((favoriteProduct) => res.json(favoriteProduct))
            .catch(next);
    }
    //POST /favorite-product/add
    AddFavoriteProduct(req, res, next) {
        try {
            ProductFavorite.findOne({ email: req.body.email, product_id: req.body.product_id })
                .then((result) => {
                    if (result != null) {
                        const data = {
                            severity: 'error',
                            message: 'Sản phẩm yêu thích đã tồn tại',
                        };
                        res.send(data);
                    } else {
                        const formData = {
                            email: req.body.email,
                            product_id: req.body.product_id,
                            path: req.body.path,
                        };
                        const productFavorite = new ProductFavorite(formData);
                        productFavorite
                            .save()
                            .then(() => {
                                const data = {
                                    severity: 'success',
                                    message: 'Đã thêm vào danh sách sản phẩm yêu thích',
                                };
                                res.send(data);
                            })
                            .catch(() => {
                                const data = {
                                    severity: 'error',
                                    message: 'thêm vào danh sách sản phẩm yêu thích thất bại',
                                };
                                res.send(data);
                            });
                    }
                })
                .catch(() => {
                    const data = {
                        severity: 'error',
                        message: 'Kiểm tra sản phẩm thất bại',
                    };
                    res.send(data);
                });
        } catch (error) {
            next(error);
        }
    }

    //POST /favorite-product/delete
    DestroyFavoriteProduct(req, res, next) {
        try {
            ProductFavorite.findOne({ email: req.body.email, product_id: req.body.product_id })
                .then((result) => {
                    if (result == null) {
                        const data = {
                            severity: 'error',
                            message: 'Không tìm thấy sản phẩm yêu thích',
                        };
                        res.send(data);
                    } else {
                        ProductFavorite.deleteOne({ email: req.body.email, product_id: req.body.product_id })
                            .exec()
                            .then(() => {
                                const data = {
                                    severity: 'error',
                                    message: 'Đã xóa khỏi danh sách yêu thích! ',
                                };
                                res.send(data);
                            })
                            .catch(() => {
                                const data = {
                                    severity: 'error',
                                    message: 'Xóa sản phẩm yêu thích thất bại',
                                };
                                res.send(data);
                            });
                    }
                })
                .catch(() => {
                    const data = {
                        severity: 'error',
                        message: 'Kiểm tra sản phẩm thất bại',
                    };
                    res.send(data);
                });
        } catch (error) {
            next(error);
        }
    }
    // GET /search
    search(req, res, next) {
        const page = req.query.page || 1;
        Product.paginate({ name: { $regex: req.query.name, $options: 'i' } }, { page: page, limit: 16 })
            .then((products) => {
                const data = products.docs.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    products.docs = result;
                    res.json(products);
                });
            })
            .catch(next);
    }
    sort(req, res, next) {
        Product.find()
            .sort({ _id: -1 })
            .exec()
            .then((product) => res.json(product));
    }
}

module.exports = new SiteController();
