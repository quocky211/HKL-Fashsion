const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const User = new Schema(
    {
        _id: { type: Number },
        email: { type: String, unique: true, require: true },
        name: { type: String, require: true },
        password: { type: String, require: true },
        gender: { type: String },
        phone: { type: String },
        address: { type: String },
        birthday: { type: Date },
        level: { type: Boolean, require: false, default: false },
    },
    {
        _id: false,
        timestamps: true,
    },
);

User.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

User.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {}
};

User.plugin(AutoIncrement, { id: 'user_id_counter' });
User.plugin(mongoosePaginate);

module.exports = mongoose.model('user', User);
