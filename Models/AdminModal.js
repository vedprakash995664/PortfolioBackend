const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    password:{  
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const Admin = new mongoose.model("admin",AdminSchema);

module.exports = Admin;

