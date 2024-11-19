import { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function Home() {
  const [show, setShow] = useState(false);
  const navigate=useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user=Cookies.get('user')
  console.log(user);

  useEffect(() => {
    async function fetchData() {
      try {
        if(user===undefined)
    {
        navigate('/login');
    }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);



  return (
    <>
      <Navbar/>
      <div className='d-flex '>
          <Sidebar/>
          <div>
            
          </div>
      </div>
    </>
  );
}

export default Home;