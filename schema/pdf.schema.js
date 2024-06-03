const mongoose=require('mongoose');

const schema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    bgimg:{
        type:String,
        required:true
    }
},{
    versionKey:false
});

const Books=mongoose.model("BooksPDF",schema);

module.exports=Books;