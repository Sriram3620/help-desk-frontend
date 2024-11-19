import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './components/Login';
import SignUp from './components/Signup/inde';
import Home from './components/Home';
import Yourtickets from './components/Yourtickets';
import Help from './components/Help';
import AgentCustomer from './components/Agent-customer';
import AdminTickets from './components/Admin-tickets';
import AdminCustomers from './components/Admin-customers';
import Adminagents from './components/Admin-agents';
const App = () => {
  return (
    <Router>
  
        
      
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/help' element={<Help/>}/>
            <Route path='/your-tickets' element={<Yourtickets/>}/>
            <Route path='/agent-customers' element={<AgentCustomer/>}/>
            <Route path='/admin-tickets' element={<AdminTickets/>}/>
            <Route path='/admin-customers' element={<AdminCustomers/>}/>
            <Route path='/admin-agents' element={<Adminagents/>}/>
          </Routes>


    </Router>
  );
};

export default App;
