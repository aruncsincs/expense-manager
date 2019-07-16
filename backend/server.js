const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors =require('cors');
const mongoose=require('mongoose');
const emRoutes=express.Router();
const PORT=4000;

let EM=require('./em.model');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/ems',{useNewUrlParser:true})
const connection =mongoose.connection;
connection.once('open',function(){
console.log('mongodb connection successfuly');
});


emRoutes.route('/').get(function(req,res)
{
EM.find(function(err,ems){
            if(err){console.log(err);}
            else{res.json(ems);}          
});
});


emRoutes.route('/:id').get(function(req,res)
{   let id=req.params.id;
    EM.findById(id,function(err,em){res.json(em);});
});


emRoutes.route('/add').post(function(req,res){
let em=new EM(req.body);
em.save()
.then(em=>{
    res.status(200).json({'em':'em added successfuly'}); })
    .catch(err=>{res.status(400).send('adding new em failed');})
});


emRoutes.route('/delete/:id').delete(function(req,res)
{   let id=req.params.id;
    EM.findByIdAndDelete(id,function(err,em){res.json(em);});
});
  

app.use('/ems',emRoutes);
app.listen(PORT,function(){
console.log('server running on port:'+PORT);
});