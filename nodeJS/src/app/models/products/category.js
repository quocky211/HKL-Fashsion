const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Category = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Category.plugin(mongooseDelete);
// Category.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true,
// });
Category.plugin(AutoIncrement, { id: 'category_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('category', Category);
