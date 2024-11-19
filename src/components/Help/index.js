
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import axios from "axios";
import Cookies from 'js-cookie'
import "./index.css"

function Help() {
  const [validated, setValidated] = useState(false);
  const role = Cookies.get('user');
  const [data,setData]=useState({
    email:role,
    name:"",
    title:"",
    des:"",
    notes:"",
  })

  const handleChange=(event)=>
  {
    setData({
        ...data,
        [event.target.name]:event.target.value
      })
  }

  const handleSubmit =async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
        const res=await axios.post("http://localhost:3001/customer-tickets",data);
        console.log(res);
    }
    setValidated(true);
  };

  

  return (
    <>
      <Navbar/>
      <div className='d-flex bg-con'>
          <Sidebar/>
          <div className='m-3 home-content-bg'>
        
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label className='name-form'>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name='name'
            placeholder="First name"
            defaultValue=""
            onChange={handleChange}
          />
          
        </Form.Group>
        <br/>
        <Form.Group className='mt-3' as={Col} md="12" controlId="validationCustom02">
          <Form.Label className='name-form'>Title</Form.Label>
          <Form.Control
            required
            name='title'
            type="text"
            placeholder="title"
            defaultValue=""
            onChange={handleChange}
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group className='mt-3' as={Col} md="12" controlId="validationCustom02">
          <Form.Label className='name-form'>Description</Form.Label>
          <Form.Control
            required
            name='des'
            type="text"
            placeholder="Description"
            defaultValue=""
            onChange={handleChange}
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group className='mt-3' as={Col} md="12" controlId="validationCustom02">
          <Form.Label className='name-form'>Notes</Form.Label>
          <Form.Control
            required
            name='notes'
            type="text"
            placeholder="Notes"
            defaultValue=""
            onChange={handleChange}
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        </Form.Group>
      </Row>
     
       
      
      
      <Button type="submit">Submit form</Button>
           </Form>
          </div>
      </div>
    </>
  );
}

export default Help;