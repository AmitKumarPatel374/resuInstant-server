const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        let res =await mongoose.connect(process.env.MONGO_URI);

        if (res){
            console.log("mongoose connected successfully");
        }

    } catch (error) {
        console.log("error while connecting databse -->",error);
    }
}

module.exports = connectDB;