import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Sidebar from "./components/sideBar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from './pages/Users';
import Contacts from './pages/Contacts'
import Contracts from './pages/Contracts'
import Orders from './pages/Orders'

function App() {
  return (
    <Router>
      <Sidebar/>
      <Switch>
        <Route path='/' exact component={Dashboard}/>
        <Route path='/contacts' component={Contacts}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/users' component={Users}/>
        <Route path='/contracts' component={Contracts}/>
      </Switch>
    </Router>
  );
}

export default App;
