const mongoose = require('mongoose');

const ConnenctDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Wallet-N-DB");
        console.log("MogoDB Connected");
    } catch (error) {
        console.log("MogoDB Error",error);
    }
};

module.exports = ConnenctDB;