const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let EMCAT=new Schema(

{  
    newcategory:{type:String},
    type:{type:String}
}

);

module.exports=mongoose.model('EMCAT',EMCAT);