const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ProductFavorite = new Schema(
    {
        _id: { type: Number },
        email: { type: String, ref: 'user' },
        product_id: { type: Number, ref: 'product' },
        path: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

ProductFavorite.plugin(AutoIncrement, { id: 'product_favorite_id_counter' });
module.exports = mongoose.model('product_favorites', ProductFavorite);
