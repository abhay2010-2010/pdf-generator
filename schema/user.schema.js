const mongoose=require('mongoose');

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['admin','user'],
        default:"user"
    }
},{
    versionKey:false
});

const Users=mongoose.model("PDFUser",schema);

module.exports=Users;