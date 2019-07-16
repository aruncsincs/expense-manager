import React, { Component } from 'react';
import axios from 'axios';


const EM=props=>(      
      <tr >
         <td>{props.em.type}</td>
         <td>{props.em.category}</td>
         <td>{props.em.type==="Expenses" ? "-":""}{props.em.rs}</td> 
         <td>{props.em.date}/{props.em.month}/{props.em.year}</td>
         <td><input type="button" value="Delete" onClick={()=>DEL(props.em._id,props.changeh)}/></td>
      </tr>
)


const DEL=(id,changeh)=>{
  axios.delete('http://localhost:4000/ems/delete/'+id)
  .then(res => {
    console.log(res.data);changeh();
})
.catch((err) => {
    console.log(err);
})
}








class List extends Component {
    constructor(props){
        super(props);
        this.state={ems:[],change:false,Income:0,Expenses:0,select:false,
                    year:new Date().getFullYear(),month:new Date().getMonth()+1,update:false};
                      }


componentDidMount(){console.log("list componenetDidMount")
axios.get('http://localhost:4000/ems')
.then(res=>{this.setState({ems:res.data });             
res.data.forEach((currentEm)=>{  if(currentEm.month===this.state.month&&currentEm.year===this.state.year)
                                     if(currentEm.type==='Income') this.setState({Income:this.state.Income+currentEm.rs})
                                     else  this.setState({Expenses:this.state.Expenses+currentEm.rs})  ;   
} );                                   
})
.catch(function(error){console.log(error);})
}


emliststate=()=>{ var x=0,y=0;
  this.state.ems.forEach((currentEm)=>{  if(currentEm.month===this.state.month&&currentEm.year===this.state.year)
    {if(currentEm.type==='Income') x=x+currentEm.rs;
       else  y=y+currentEm.rs;}
      } );
  this.setState({Income:x,Expenses:y})
  console.log(this.state.Income,this.state.Expenses);
  this.setState({update:false});   
}


changeh=()=>{
  axios.get('http://localhost:4000/ems')
  .then(res=>{this.setState({ems:res.data });  })
  .then(this.emliststate)
}


emlist=()=>{ 
      return this.state.ems.map((currentEm,i)=>{ if(currentEm.month===this.state.month&&currentEm.year===this.state.year)    
      return  <EM em={currentEm} key={i} changeh={this.changeh}/> })  }


test=()=>{
    this.setState(({ select }) => {return {select: !select, };});}
  inc=()=>{this.setState(({ year }) => {return {year: year + 1,update:true};});}
  dec=()=>{ this.setState(({ year }) => {return {year: year - 1,update:true };});}
  handlemonth(monthi){this.setState(({month }) => {return {month: monthi ,update:true}; });  }
  



    render() {                  
        return ( <React.Fragment> 
                   <button  className="btn" onClick={this.test} >Click For History</button>
                    {(this.state.select===false)?"":
                    <div>
                       <button className="btn" onClick={this.dec}>Prev Year</button>
                       <b style={{color:"blue"}}>{this.state.year}</b>       
                       <button className="btn" onClick={this.inc}>Next Year</button>  
                       <br/>
                       <button className="btn" onClick={  ()=>this.handlemonth(1)}>Jan</button>
                       <button className="btn" onClick={()=>this.handlemonth(2)}>Feb</button>
                       <button className="btn" onClick={()=>this.handlemonth(3)}>Mar</button>
                       <button className="btn" onClick={()=>this.handlemonth(4)}>Apr</button>
                       <button className="btn" onClick={()=>this.handlemonth(5)}>May</button>
                       <button className="btn" onClick={()=>this.handlemonth(6)}>Jun</button>
                       <button className="btn" onClick={()=>this.handlemonth(7)}>Jul</button>
                       <button className="btn" onClick={()=>this.handlemonth(8)}>Aug</button>
                       <button className="btn" onClick={()=>this.handlemonth(9)}>Sep</button>
                       <button className="btn" onClick={()=>this.handlemonth(10)}>Oct</button>
                       <button className="btn" onClick={()=>this.handlemonth(11)}>Nov</button>
                       <button className="btn" onClick={()=>this.handlemonth(12)}>Dec</button>
                    </div>         
            } {(this.state.update)? this.emliststate():""}    
              <div className="border border-secondary" style={{background:"yellow"}}>                
                <h6> <b style={{margin:10}}>Income: {this.state.Income}</b>
                     <b style={{margin:240}}>Expenses: {this.state.Expenses} </b>
                     <b style={{margin:45}}> Balance: {this.state.Income-this.state.Expenses}</b>
                </h6>
              </div>

            <div style={{background:"lightpink"}}>
             <table className="table table-striped">
                     <thead>
                       <tr>
                         <td><b>Type</b></td>
                         <td><b>Category</b></td>
                         <td><b>RS</b></td>
                         <td><b>Date</b></td>
                         <td><b>Action</b></td>
                       </tr>
                     </thead>
                     <tbody>
                     {this.emlist()}
                    </tbody>
             </table>                        
            </div>
            </React.Fragment>
         );
    }
}
export default List;