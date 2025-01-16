const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
// plugin used due to it it include username ,hashing,salting automatically provided
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
