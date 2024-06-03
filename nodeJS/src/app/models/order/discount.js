const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Discount = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        code: { type: String },
        is_used: { type: Boolean, default: false },
        expired_day: { type: Date },
        discount: { type: Number },
    },
    {
        _id: false,
        timestamps: true,
    },
);

Discount.plugin(AutoIncrement, { id: 'discount_id_counter' });

module.exports = mongoose.model('discount', Discount);