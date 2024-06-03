const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const OrderDetail = new Schema(
    {
        _id: { type: Number },
        order_id: { type: Number, ref: 'order' },
        product_id: { type: Number, ref: 'product' },
        name: { type: String},
        color: {type: String},
        size: {type: String},
        path: {type: String},
        amount: { type: Number },
        total: { type: Number },
        qty: { type: Number },
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
OrderDetail.plugin(AutoIncrement, { id: 'order_detail_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('order_detail', OrderDetail);
