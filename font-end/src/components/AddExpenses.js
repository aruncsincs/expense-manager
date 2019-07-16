import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';



class AddExpenses extends Component {
    constructor(props){
        super(props);
        this.state={type:"Expenses",
                    category:"Others",
                    rs:0,
                    year:0,
                    month:0,
                    date:0,
                    dir:false,
                    newcategory:"",emscat:[],
        }
    }


onChangeRs=(e)=>{this.setState({rs:e.target.value});}
onChangeCategory=(e)=>{this.setState({category:e.target.value})}
onChangeNewCategory=(e)=>{this.setState({newcategory:e.target.value,category:e.target.value})}


onSubmitForm=(e)=>{e.preventDefault();
    console.log(this.state);
    const addExpenses={
        type:"Expenses",
        category:this.state.category,
        rs:this.state.rs,
        year:new Date().getFullYear(),
        month:new Date().getMonth()+1,
        date:new Date().getDate(),
    }
    
    if(this.state.newcategory!==""){
        const newcategory={newcategory:this.state.newcategory,type:this.state.type}
        axios.post('http://localhost:5000/emscat/add',newcategory)
        console.log(newcategory)
     }
       axios.post('http://localhost:4000/ems/add',addExpenses)
      .then(res=>(res.status===200)?this.setState({dir:true}):"")   
}



catGroup=()=>{ 
    axios.get('http://localhost:5000/emscat')
    .then(res=>{this.setState({emscat:res.data})})

   return this.state.emscat.map((currentEmCat,index)=>{ return <Row key={index}><Col>
   <input type="radio" onChange={this.onChangeCategory} value={currentEmCat.newcategory} checked={this.state.category===currentEmCat.newcategory} />
   {currentEmCat.newcategory} </Col>
   <Col> <input type="button" value="Delete Category" onClick={()=>this.delHandle(currentEmCat._id)}/></Col>
   </Row>
   });
  }
  
  

catGroup=()=>{ 
    axios.get('http://localhost:5000/emscat')
    .then(res=>{this.setState({emscat:res.data})})

   return this.state.emscat.map((currentEmCat,index)=>{ if(currentEmCat.type===this.state.type){ return  <Row key={index}><Col>
   <input type="radio" onChange={this.onChangeCategory} value={currentEmCat.newcategory} checked={this.state.category===currentEmCat.newcategory} />
   {currentEmCat.newcategory} </Col>
   <Col> <input type="button" value="Delete Category" onClick={()=>this.delHandle(currentEmCat._id)}/></Col>
   </Row>}
   });
  }

  
delHandle=(id)=>{
      axios.delete('http://localhost:5000/emscat/delete/'+id)
      .then(res => {
        console.log(res.data);this.changeh();
    })
    .catch((err) => {
        console.log(err);
    }) 
  }
  
  
changeh=()=>{
      axios.get('http://localhost:5000/emscat')
      .then(res=>{this.setState({emscat:res.data });  })
    }
  
  


    render() { if(this.state.dir===true)return<Redirect to="/"/>
        return ( 

     <div className="border border-danger" style={{background:"#E9967A"}}>
         <form onSubmit={this.onSubmitForm} style={{margin:15}}>
           <Container>
            <h5>Select Category for Expenses </h5>
            {this.catGroup()}
           <Row>
            <Col><input type="text" placeholder="Ex: Tea" onChange={this.onChangeNewCategory}/>din't find the Category Add here new Category</Col>
           </Row><br></br>
         
          <input type="number" onChange={this.onChangeRs} />:Rs
          <button style={{background:"orange"}}>ADD</button>
         </Container>
       </form>
     </div>
              );
         }
     }
      
     export default AddExpenses;