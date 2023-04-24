const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
avatar :
{
    type : String
}
},{
    timestamps:true
});

module.exports = User = mongoose.model('User',userSchema)