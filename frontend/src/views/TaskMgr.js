import {useState, useEffect} from 'react'
import useAxios from '../utils/useAxios'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'


function Task() {
    const baseUrl = "http://127.0.0.1:8000/api"
    const api = useAxios()

    const token = localStorage.getItem("authTokens") 
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    const [Task, setTask] = useState([])
    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        await api.get(baseUrl + '/Task/' + user_id + '/').then((res) => {
            console.log(res.data);
            setTask(res.data)
        })
    }

    
    const [createTask, setCreateTask] = useState({title: "", completed: "", duration: 0 })
    const handleNewTaskTitle = (event) => {
        setCreateTask({
            ...createTask,
            [event.target.name]: event.target.value
        })
    }
    
    console.log(createTask.title);  

    const formSubmit = () => {
        const formdata = new FormData()

        formdata.append("user", user_id)
        formdata.append("title", createTask.title)
        formdata.append("completed", false)
        formdata.append("duration", createTask.duration)

        try{
            api.post(baseUrl + '/Task/' + user_id + '/', formdata).then((res) => {
                console.log(res.data);
                Swal.fire({
                    title: "Task Added",
                    icon:"success",
                    toast: true,
                    timer: 2000,
                    position: "top-right",
                    timerProgressBar: true,
                })
                fetchTasks()
                createTask.title = ""
            })
        } catch (error){
            console.log(error);
        }
    }

    const deleteTask = async (Task_id) => {
        await api.delete(baseUrl + '/Task-detail/' + user_id + '/' + Task_id + '/')
        Swal.fire({
            title: "Task Deleted",
            icon:"success",
            toast: true,
            timer: 2000,
            position: "top-right",
            timerProgressBar: true,
        })
        fetchTasks()
    }

    const markTaskAsComplete = async (Task_id) => {
        await api.patch(baseUrl + '/Task-mark-as-completed/' + user_id + '/' + Task_id + '/')
        Swal.fire({
            title: "Task Completed",
            icon:"success",
            toast: true,
            timer: 2000,
            position: "top-right",
            timerProgressBar: true,
        })
        fetchTasks()
    }

  return (
        <div>
            <div>
                <div className="container" style={{marginTop:"150px", padding:"10px"}}>
                    <div className="row justify-content-center align-items-center main-row">
                        <div className="col shadow main-col bg-white">
                            <div className="row bg-primary text-white">
                                <div className="col p-2">
                                    <h4>Task Manager</h4>
                                </div>
                            </div>
                            <div className="row justify-content-between text-white p-2">
                                <div className="form-group flex-fill mb-2">
                                    <input id="task-input" name= "title"     onChange={handleNewTaskTitle} value={createTask.title} type="text" className="form-control" placeholder='Write a Task...'  />
                                </div>
                                <button type="button" onClick={formSubmit}  className="btn btn-primary mb-2 ml-2"> Add Task </button>
                            </div>
                            <div className="row" id="Task-container">
                                {Task.map((Task) => 
                                
                                <div className="col col-12 p-2 Task-item">
                                    <div className="input-group">
                                        {Task.completed.toString() === "true" && 
                                            <p className="form-control"><strike>{Task.title}</strike></p>
                                        }
                                        {Task.completed.toString() === "false" && 
                                            <p className="form-control">{Task.title} - duration: {Task.duration} days</p>
                                        }
                                        <div className="input-group-append">
                                            <button className="btn bg-success text-white ml-2" type="button" id="button-addon2 " onClick={() => markTaskAsComplete(Task.id)}><i className='fas fa-check' ></i></button>
                                            <button className="btn bg-danger text-white me-2 ms-2 ml-2" type="button" id="button-addon2 " onClick={() => deleteTask(Task.id)}><i className='fas fa-trash' ></i></button>
                                        </div>
                                    </div>
                                </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Task