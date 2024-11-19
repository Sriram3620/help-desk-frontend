import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./index.css"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ResNavbar() {
    const role = Cookies.get('role')
    const navigate=useNavigate();

    const OnLogout=()=>
        {
           Cookies.remove('jwt_token')
           Cookies.remove('user')
           Cookies.remove('role')
           
           navigate('/login', { replace: true });
        }  
    

  return (
    <>
    
    <Navbar expand="lg" className="bg-body-tertiary p-3">
      <Container fluid>
        <Navbar.Brand className='' href="#">
            <img className='logo ' src='https://cdn4.iconfinder.com/data/icons/helpdesk-support-business/128/help_desk_business-29-1024.png'/>
            <span className='logo-name'>Help-Desk App</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '400px' }}
            navbarScroll
          >
           {role=="customer"&& <Nav.Link  onClick={()=> navigate("/your-tickets")} className='d-md-none'>Yourtickets</Nav.Link>}
            {role=="customer" && <Nav.Link className='d-md-none' onClick={()=> navigate("/help")}  >Help</Nav.Link>}
            {(role=="Agent1" || role=="Agent2") &&  <Nav.Link className='d-md-none' onClick={()=> navigate("/agent-customers")} >Customers</Nav.Link>}
            {role=="admin" &&  <Nav.Link className='d-md-none' onClick={()=> navigate("/admin-customers")}>All Customers</Nav.Link>}
            {role=="admin" && <Nav.Link className='d-md-none' onClick={()=> navigate("/admin-tickets")}>All Tickets</Nav.Link>}
           {role=="admin" &&  <Nav.Link className='d-md-none' onClick={()=> navigate("/admin-agents")}>All Agents</Nav.Link>}
           
             
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            <br/>
           
          </Form>
          <div>
            <button onClick={OnLogout}  className='logout-btn mt-3 d-md-none'>Logout</button>
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  );
}

export default ResNavbar;