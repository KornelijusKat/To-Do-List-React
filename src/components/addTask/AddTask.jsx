import * as service from '../../services/TasksCRUDservice';

import { useAuthState } from "react-firebase-hooks/auth";
import {useState, useEffect } from "react";
import {auth} from "../../services/AuthServices";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as LoginArrow } from  "../../assets/icons/LoginArrow.svg" 
import { ReactComponent as Notification} from  "../../assets/icons/notification.svg" 
import { useGlobalContext } from '../../context/Context';
import validateAddProject from '../../helpers/validateAddProject';

const AddTask = ()=>{
    const [user, loading, error] = useAuthState(auth); 
    const {dispatch} = useGlobalContext();
    const { id, taskId } = useParams();
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        to:'',
        priority:'',
        status: false
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]:e.target.value 
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (!user) {
            console.error("User is not logged in.");
            navigate('/')
        }
      
        if(taskId){
            service.updateTask(id , taskId ,formData)
          
        }else{
            console.log(formData)
            service.addTask(id, formData)
        }
        navigate(`/projectview/${id}`)
    }
    const handleNavigateHome = () =>{
        navigate(`/projectview/${id}`);
    }
    useEffect(() => {
        if (taskId) {
            service.showTaskById(id, taskId, (task) => {
                setFormData({
                    name: task.name || '',
                    description: task.description || '',
                    to: task.to || '',
                    priority: task.priority || '',
                    status: task.status || false
                });
            });
        }
        if (loading) return;
        if (!user) navigate('/');
    }, [id, taskId, user, loading, navigate]);
    return(
         <div className="container container-addproject">
                        <div className="row addproject-header d-flex justify-content-between">
                            <div className="col-3 text-start">
                                <LoginArrow className='addproject-icon' id='addproject-icon--arrow' onClick={handleNavigateHome}></LoginArrow> 
                            </div>
                            <div className="col-6">
                                <h1>{(taskId)?"Edit Your Task":"Add Task"}</h1>
                            </div>
                            <div className="col-3 text-end">
                                <Notification className='addproject-icon'></Notification>
                            </div>
                        </div>
                        <form className='form' onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor='name'>Task Name</label>
                                    <input type='text' name='name'className='form-control' placeholder="Enter Task name" onChange={handleChange} value={formData.name}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='description'>Task Description</label>
                                    <textarea name="description" className="form-control" onChange={handleChange} value={formData.description}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="to">Task deadline:</label>
                                    <input type="date" name="to" className="form-control" onChange={handleChange} value={formData.to}/>
                                </div>
                                <div className="mb-3">
                                    <select name="priority" className="form-control" onChange={handleChange} value={formData.priority} required>
                                        <option value='' disabled >--select priority--</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">{(taskId)?"Update":"Save"}</button>
                                </div>
                        </form>
                    </div> 
    )
}
export default AddTask