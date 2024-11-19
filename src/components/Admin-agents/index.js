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

const Adminagents=()=>
{
    const [tickets,setTickets]=useState([]);
    const [validated, setValidated] = useState(false);
    const [data,setData]=useState({});
    const agent=Cookies.get("role")
     console.log(agent)
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
                status:val.status,
            }
            setData(d);

        }


    useEffect(() => {
        async function fetchData() {
          try {
            const res = await axios.get("http://localhost:3001/agentdata");
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
        console.log(event.target.value)
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
        <div>
            <ResNavbar/>
      <div className='d-flex '>
          <Sidebar/>
          <div className='m-4 d-flex flex-wrap p-3'>
            {tickets.map((val)=>{
                return(
                    <div key={val._id} className='m-2 '>
                         <Card className='card-bg shadow' border="" style={{ width: '24 rem' }}>
                       
                        <Card.Body>
                      <Card.Title className='card-title'>Name : <span className='admin-name'>{val.name}</span></Card.Title>
                      <Card.Title className='card-title'>Email : <span className='admin-name'>{val.email}</span></Card.Title>
                       <Card.Text  className='card-des'>
                           ID: <span className='card-des-val'>{val._id}</span>
                        </Card.Text>

                        <Card.Text className='card-des'>
                          Role: <span className='card-des-val'>{val.role}</span>
                        </Card.Text>
                        </Card.Body>
                        <div>
                       

                          
                        </div>
                    </Card>
                    </div>
                )
            })}
          </div>
      </div>
        </div>
    )
}

export default Adminagents;