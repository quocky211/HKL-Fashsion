const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Product = new Schema(
    {
        _id: { type: Number },
        category_id: { type: Number, ref: 'category' },
        category_detail_id: { type: Number, ref: 'category_detail' },
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        discount: { type: Number },
        material: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Product.plugin(mongooseDelete);
// Product.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true,
// });
Product.plugin(mongoosePaginate);
Product.plugin(AutoIncrement, { id: 'product_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('product', Product);
