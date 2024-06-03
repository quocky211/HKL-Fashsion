const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CategoryDetail = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        category_id: { type: Number, ref: 'category' },
        img_size: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// CategoryDetail.plugin(mongooseDelete);
// CategoryDetail.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true,
// });
CategoryDetail.plugin(AutoIncrement, { id: 'category_detail_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('category_detail', CategoryDetail);
