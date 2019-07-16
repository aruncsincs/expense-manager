import React, { Component } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';



class Chart extends Component {
    constructor(props){
        super(props);
        this.state = { ems:[],Income:[],Expenses:[],year:new Date().getFullYear(),
            chartData:{
             labels:['Jan','Feb','March','April','May','Jun','July','Aug','Sep','Oct','Nov','Dec'],
             datasets:[
                {
                    label:'Bugget',
                    data:[
                        200,
                        422,
                        55,
                        58,
                        156,
                        456,
                        452
                    ],
                   backgroundColor:[
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e",
                     ]
                }
             ]
            }
         }
    }


componentDidMount()
{
    this.datainit()   
}


datainit=()=>
{ 
axios.get('http://localhost:4000/ems')
.then(res=>{this.setState({ems:res.data,Expenses:[] });  

for(var i=0;i<=11;i++){   var x=0,y=0;      
res.data.forEach((currentEm)=>{ if(currentEm.year===this.state.year&&currentEm.month===i+1){console.log("kk");
                                     if(currentEm.type==='Income') x=x+currentEm.rs;
                                     else  y=y+currentEm.rs  ;  }                                   
} );  
this.setState({Income:[...this.state.Income,x],Expenses:[...this.state.Expenses,y]},()=>this.tt()) ;console.log(this.state.Expenses)
};

})
}



tt=()=>{
    this.setState({
        chartData:{
         datasets:[
            {
                label:'Month Expense',
                data:[
                    this.state.Expenses[0],this.state.Expenses[1],this.state.Expenses[2],this.state.Expenses[3],this.state.Expenses[4],
                    this.state.Expenses[5],this.state.Expenses[6],this.state.Expenses[7],this.state.Expenses[8],this.state.Expenses[9],
                    this.state.Expenses[10],this.state.Expenses[11]]
                ,
            backgroundColor:[
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
                "#e74c3c",
                "#34495e",
                "#FAA43A",
                "#B2912F",
                "#B276B2",
                "#F15800",
                "#5DA5DA"       
               ]
          }
         ]
     }
})
}


inc=()=>{this.setState(({ year }) => {return {year: year + 1};},()=>this.datainit());}
dec=()=>{ this.setState(({ year }) => {return {year: year - 1 };},()=>this.datainit());}
  



    render() { 
        return (
           <div className="chart">
                    <br/>
                    <div className="text-center">
                    <button className="btn" onClick={this.dec} >Prev Year</button> Expense Chart:
                    <b style={{color:"blue"}}>{this.state.year} </b>    
                    <button className="btn" onClick={this.inc}>Next Year</button>  
                    </div>

                   <Bar
                   data={this.state.chartData}
                   options={{ 
                     title:{
                      display:true,
                      text:'',
                      fontSize:25
                   },
                   legend:{
                     display:true,
                     position:"bottom"
                         }
                       }}
                    />
           </div>        
          );
    }
}
 
export default Chart;