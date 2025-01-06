import * as service from '../../services/ProjectCRUDservices'
import { useAuthState } from "react-firebase-hooks/auth";
import {useState, useEffect } from "react";
import {auth} from "../../services/AuthServices";
import { useNavigate, useParams } from "react-router-dom";
import './_addProject.scss'
import { ReactComponent as LoginArrow } from  "../../assets/icons/LoginArrow.svg" 
import { ReactComponent as Notification} from  "../../assets/icons/notification.svg" 
import { useGlobalContext } from '../../context/Context';
import validateAddProject from '../../helpers/validateAddProject';
const AddProject = () =>{
    const [user, loading, error] = useAuthState(auth); 
    const {dispatch} = useGlobalContext();
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        from:'',
        to:'',
        uid:''
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
            return;
        }
        if(!validateAddProject(formData)){
            return;
        }
        if(id){
            dispatch({
                type: "UPDATE_PROJECT",
                payload: service.updateProject(id, formData),
            });
        }else{
            dispatch({type:"ADD_PROJECT", payload:service.addProject({
                ...formData,
                uid:user.uid
            })})
        }
        navigate('/projects')
    }
    const handleNavigateHome = () =>{
        navigate('/projects');
    }
    useEffect(()=>{
        id && service.showById(item=>setFormData(item), id);
        if(loading) 
            return
        console.log(user)
        if(!user) 
            navigate('/')
    },[id, user, loading, navigate])
    return(
        <>
            <div className="container container-addproject">
                <div className="row addproject-header d-flex justify-content-between">
                    <div className="col-3 text-start">
                        <LoginArrow className='addproject-icon' id='addproject-icon--arrow' onClick={handleNavigateHome}></LoginArrow> 
                    </div>
                    <div className="col-6">
                        <h1>{(id)?"Edit Your Project":"Add Project"}</h1>
                    </div>
                    <div className="col-3 text-end">
                        <Notification className='addproject-icon'></Notification>
                    </div>
                </div>
                <form className='form' onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor='name'>Project Name</label>
                            <input type='text' name='name'className='form-control' placeholder="Enter project name" onChange={handleChange} value={formData.name}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor='description'>Projekct Description</label>
                            <textarea name="description" className="form-control" onChange={handleChange} value={formData.description}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="from">Project Start:</label>
                            <input type="date" name="from" className="form-control" onChange={handleChange}  value={formData.from}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="to">Project End:</label>
                            <input type="date" name="to" className="form-control" onChange={handleChange} value={formData.to}/>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">{(id)?"Update":"Save"}</button>
                        </div>
                </form>
            </div> 
        </>
    )
}
export default AddProject