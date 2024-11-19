import { useState,useEffect } from 'react';
import axios from 'axios';
import ResNavbar from '../Navbar';
import Sidebar from '../Sidebar';
import Cookies from 'js-cookie'
import "./index.css"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

const Yourtickets=()=>
{

    const [tickets,setTickets]=useState([]);
    const [validated, setValidated] = useState(false);
    const [data,setData]=useState({});
    const email=Cookies.get("user")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (val) =>
        { 
            setShow(true);
            const d={
                _id:val._id,
                name:val.name,
                email:val.email,
                des:val.des,
                notes:val.notes,
                title:val.title,
            }
            setData(d);

        }


    useEffect(() => {
        async function fetchData() {
          try {
            const res = await axios.post("http://localhost:3001/getcutomertickets",{email:email});
            setTickets(res.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);

      const handleSubmit =async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        setValidated(true);
      };
      
      const handlechange=async(event)=>
      {
        setData({
            ...data,
            [event.target.name]:event.target.value
          })
      }

      const handleSendData=async()=>
      {
        const res = await axios.post("http://localhost:3001/customerupdate/",data);

      }

      console.log(tickets);


    return(
       <>
       
       <div>
            <ResNavbar/>
      <div className='d-flex '>
          <Sidebar/>
          {tickets.length==0 && <div className='text-center'>
            <img className='nodata-img' src='https://image.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg'></img>
            </div>}
         {tickets.length!=0 && <div className='m-4 d-flex flex-wrap p-3'>
            {tickets.map((val)=>{
                return(
                    <div key={val._id} className='m-2 '>
                         <Card className='card-bg shadow' border="" style={{ width: '18rem' }}>
                       <Card.Header className='card-name'>{val.name}</Card.Header>
                        <Card.Body>
                      <Card.Title className='card-title'>Title : <span className='card-title-val'>{val.title}</span></Card.Title>
                       <Card.Text  className='card-des'>
                           Description: <span className='card-des-val'>{val.des}</span>
                        </Card.Text>
                        <Card.Text className='card-des'>
                          Createdtime: <span className='card-des-val'>{val.createdtime}</span>
                        </Card.Text>
                        <Card.Text className='card-status'>
                          Status: <span className='card-status-val'>{val.status}</span>
                        </Card.Text>
                        <Card.Text className='card-des'>
                          UpdatedTime: <span className='card-des-val'>{val.updatedtime}</span>
                        </Card.Text>
                        <Card.Text className='card-des'>
                          Notes!: <span className='card-des-val'>{val.notes}</span>
                        </Card.Text>
                        </Card.Body>
                        <div>
                        <Button className='update-btn' variant="" onClick={()=>{handleShow(val)}}>
                                update
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label className='name-form'>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='name'
                                placeholder="First name"
                                defaultValue={val.name}
                                value={val.name}
                                disabled
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
                                value={data.title}
                                disabled
                                
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
                                defaultValue={data.des}
                                disabled
                                
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
                                defaultValue={data.notes}
                                onChange={handlechange}
                            />
                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                                                    </Form.Group>
                                                </Row>
                                                
                            
                            <Button type="submit" onClick={handleSendData}>Submit form</Button>
                                </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                               
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Card>
                    </div>
                )
            })}
          </div>}
      </div>
        </div>
        </>
    )
}

export default Yourtickets;