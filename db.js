const mongoose = require('mongoose')

async function Connectdb(url){
    return mongoose.connect(url);
}

module.exports = Connectdb;