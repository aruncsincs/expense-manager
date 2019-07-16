const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let EM=new Schema(

{   type:{type:String},
    category:{type:String},
    rs:{type:Number},
    year:{type:Number},
    month:{type:Number},
    date:{type:Number},
}

);

module.exports=mongoose.model('EM',EM);