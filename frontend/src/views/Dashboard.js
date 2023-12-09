import {useState, useEffect} from 'react'
import useAxios from "../utils/useAxios"
import jwtDecode from 'jwt-decode'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function Dashboard() {

  const [res, setRes] = useState('');
  const [events, setEvents] = useState([]); // State to hold calendar events
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

    const api = useAxios();
    const token = localStorage.getItem("authTokens")

    if (token){
      const decode = jwtDecode(token)
      var user_id = decode.user_id
      var username = decode.username
      var full_name = decode.full_name
      var image = decode.image

    }

    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await api.get("/test/")
          setRes(response.data.response)
        } catch (error) {
          console.log(error);
          setRes("Something went wrong")
        }
      }
      fetchData()
    }, ['api'])

    
    useEffect(() => {
      const fetchPostData = async () => {
        try{
          const response = await api.post("/test/")
          setRes(response.data.response)
        } catch (error) {
          console.log(error);
          setRes("Something went wrong")
        }
      }
      fetchPostData()
    }, [])

    const localizer = momentLocalizer(moment);

   
  const handleNewEventChange = (e) =>{
    const {name, value} = e.target;
  setNewEvent((prevEvent) =>( {
    ...prevEvent,
    [name]: name === 'start' || name === 'end' ? new Date(value) : value,
  }));
};
const handleAddEvent = () => {
  setEvents((prevEvents) => [...prevEvents, newEvent]);
  setNewEvent({
    title: '',
    start: new Date(),
    end: new Date(),
  });
};

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: event.color || '#3174ad',
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block',
  };
  return {
    style,
  };
};
  return (
    <div>
      <>
  <div className="container-fluid" style={{ paddingTop: "100px" }}>
    <div className="row">
      <nav className="col-md-2 d-none d-md-block bg-light sidebar mt-4">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <span data-feather="home" />
                Dashboard <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file" />
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="shopping-cart" />
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="users" />
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="bar-chart-2" />
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="layers" />
                
              </a>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span></span>
            <a className="d-flex align-items-center text-muted" href="#">
              <span data-feather="plus-circle" />
            </a>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text" />
                
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">My Dashboard</h1>
          <span>Hello {username}!</span>
          <div className="btn-toolbar mb-2 mb-md-0">
                        
          </div>
        </div>
        <div className='alert alert-success'>
          <strong>{res}</strong>
        </div>
        <h2>Calendar</h2>
        <div className="table-responsive">
        <Calendar 
        localizer={localizer} 
        events={events} 
        startAccessor="start" 
        endAccessor="end" 
        views={['month', 'week', 'day', 'agenda' ]} dayPropGetter={(date) => {
          const dayEvents = events.filter(
            (event) =>
              moment(date).startOf('day').isSameOrBefore(moment(event.end)) &&
              moment(date).endOf('day').isSameOrAfter(moment(event.start))
          );

          return {
            className: dayEvents.length > 0 ? 'has-events' : '',
          };
        }}
        components={{
          event: (event) => (
            <span>
              <strong>{event.title}</strong>
            </span>
          ),
        }}
        eventPropGetter={eventStyleGetter}
        />
        </div>
        <div>
          <h3>Add New Event</h3>
          <div className="form-group">
                  <label>Title:</label>
                  <input type="text" name="title" value={newEvent.title} onChange={handleNewEventChange} />
                </div>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input type="datetime-local" name="start" value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')} onChange={handleNewEventChange} />
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                  <input type="datetime-local" name="end" value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')} onChange={handleNewEventChange} />
                </div>
                <button type="button" onClick={handleAddEvent}>Add Event</button>
                </div>
            

        
      </main>
    </div>
  </div>
  {/* Bootstrap core JavaScript
    ================================================== */}
  {/* Placed at the end of the document so the pages load faster */}
  {/* Icons */}
  {/* Graphs */}
</>

    </div>
  )
}

export default Dashboard