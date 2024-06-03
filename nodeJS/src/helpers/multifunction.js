const ProductDetail = require('../app/models/products/product_detail');
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

module.exports = {
    HandleAddImage,

};
