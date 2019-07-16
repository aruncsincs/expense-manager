import React, { Component } from 'react';
import { BrowserRouter as Router ,Route,Link} from 'react-router-dom';
import List from './components/List'
import AddIncome from './components/AddIncome';
import AddExpenses from './components/AddExpenses';
import Chart from './components/Chart';
import "./App.css";
class App extends Component {
  
  render() { 
    return ( 
        <Router>

          <div className="container">   
            <nav className="navbar navbar-expand-lg navbar-light bg-primary" >
              <li className="navbar-nav mr-auto" ><Link to="/"           style={{color:"white"}}>List</Link></li>
              <li className="navbar-nav mr-auto"><Link to="/addincome"   style={{color:"white"}}>AddIncome</Link></li>
              <li className="navbar-nav mr-auto"><Link to="/addexpenses" style={{color:"white"}}>AddExpenses</Link></li>   
              <li className="navbar-nav mr-auto"><Link to="/Chart" style={{color:"white"}}>Chart</Link></li>   
           </nav> 
              <Route path="/" exact component={List} />
              <Route path="/addincome" exact component={AddIncome} />
              <Route path="/addexpenses" exact component={AddExpenses} />
              <Route path="/Chart" exact component={Chart} />
          </div>
        </Router>
     );
  }
}
 
export default App;