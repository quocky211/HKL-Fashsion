const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ProductComment = new Schema(
    {
        _id: { type: Number },
        user_id: { type: Number, ref: 'user' },
        product_id: { type: Number, ref: 'product' },
        star: { type: Number, default: 0 },
        message: { type: String },
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
ProductComment.plugin(AutoIncrement, { id: 'product_cmt_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('product_comment', ProductComment);
