const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://20521301:hklfashion@be-hklfashion.df39hfc.mongodb.net/db-hkl-fashion', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!');
    } catch (error) {
        console.log('Connect failure!!');
    }
};

module.exports = { connect };
