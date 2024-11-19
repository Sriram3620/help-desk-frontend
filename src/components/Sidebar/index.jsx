import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

import Cookies from 'js-cookie'


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigate=useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const role = Cookies.get('role')
  
  const OnLogout=()=>
    {
       Cookies.remove('jwt_token')
       Cookies.remove('user')
       Cookies.remove('role')
       
       navigate('/login', { replace: true });
    }  

  return (
    <div className="sidebar-bg d-none d-md-flex">
        <div>
          {role=="customer" && <h1 onClick={()=> navigate("/your-tickets")}  className="menu-items"> {"> "}Your Tickets</h1>}
          {(role=="Agent1" || role=="Agent2") &&  <h1 onClick={()=> navigate("/agent-customers")} className="menu-items">{"> "}Customers</h1>}
          {role=="customer" && <h1 onClick={()=> navigate("/help")}  className="menu-items">{"> "}Help</h1>}
          {role=="admin" && <h1 onClick={()=> navigate("/admin-tickets")} className="menu-items">{"> "}All Tickets</h1>}
          {role=="admin" && <h1 onClick={()=> navigate("/admin-customers")} className="menu-items">{"> "}All Customers</h1>}
          {role=="admin" && <h1 onClick={()=> navigate("/admin-agents")} className="menu-items">{"> "}All Agents</h1>}
         {role=="Customer" && <h1 className="menu-items">{"> "}Support Customers</h1>}
          </div>
          <div className="logout-bg">
          <h1 onClick={OnLogout} className="menu-items">{"> "}LogOut</h1>
          </div>
    </div>
  );
};

export default Sidebar;
