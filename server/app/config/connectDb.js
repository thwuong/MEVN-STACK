const mongoose = require('mongoose');
const config = require('../config');
module.exports = async () =>{
    try {
        await mongoose.connect(config.uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connect Db Success");
    } catch (error) {
        console.log("Connect Db Failed");  
    }
}