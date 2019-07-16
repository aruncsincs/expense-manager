const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors =require('cors');
const mongoose=require('mongoose');
const emRoutes=express.Router();
const PORT=5000;

let EMCAT=require('./emcat.model');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/emscat',{useNewUrlParser:true})
const connection =mongoose.connection;
connection.once('open',function(){
console.log('mongodb connection successfuly');
});


emRoutes.route('/').get(function(req,res)
{
EMCAT.find(function(err,emscat){
            if(err){console.log(err);}
            else{res.json(emscat);}          
});
});


emRoutes.route('/:id').get(function(req,res)
{   let id=req.params.id;
    EMCAT.findById(id,function(err,emcat){res.json(emcat);});
});


emRoutes.route('/add').post(function(req,res){
let emcat=new EMCAT(req.body); 
emcat.save()
.then(emcat=>{
    res.status(200).json({'emcat':'emcat added successfuly'});
    })
    .catch(err=>{res.status(400).send('adding new emcat failed');})
});


emRoutes.route('/delete/:id').delete(function(req,res)
{   let id=req.params.id;
    EMCAT.findByIdAndDelete(id,function(err,emcat){res.json(emcat);});
});


app.use('/emscat',emRoutes);
app.listen(PORT,function(){
console.log('server running on port:'+PORT);
});