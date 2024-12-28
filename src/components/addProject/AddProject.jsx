import * as service from '../../services/ProjectCRUDservices'
import { useAuthState } from "react-firebase-hooks/auth";
import {useState, useEffect } from "react";
import {auth} from "../../services/AuthServices";
import { useNavigate, useParams } from "react-router-dom";
import './_addProject.scss'
import Login from '../login/Login';
import { ReactComponent as LoginArrow } from  "../../assets/icons/LoginArrow.svg" 
import { ReactComponent as Notification} from  "../../assets/icons/notification.svg" 
const AddProject = () =>{
    const [user] = useAuthState(auth); 
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        from:'',
        to:'',
        uid:''
    })
    const handleChange = (e)=>{
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]:e.target.value 
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(user);
        console.log(formData);
        if (!user) {
            console.error("User is not logged in.");
            return;
        }
        service.addProject({
            ...formData,
            uid: user.uid
        })
    }
    useEffect(()=>{
        id && service.showById(item=>setFormData(item), id);
    },[id])
    return(
        <>
            <div className="container container-addproject">
                <div className="row addproject-header d-flex justify-content-between">
                    <div className="col-3 text-start">
                        <LoginArrow className='addproject-icon' id='addproject-icon--arrow' ></LoginArrow> 
                    </div>
                    <div className="col-6">
                        <h1>Add Project</h1>
                    </div>
                    <div className="col-3 text-end">
                        <Notification className='addproject-icon'></Notification>
                    </div>
                </div>
                <form className='form' onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor='name'>Projekto pavadinimas</label>
                            <input type='text' name='name'className='form-control' placeholder="įrašykite projekto pavadinimą" onChange={handleChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor='description'>Projekto pavadinimas</label>
                            <textarea name="description" className="form-control" onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="from">Projekto pradžia:</label>
                            <input type="date" name="from" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="to">Projekto pabaiga:</label>
                            <input type="date" name="to" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Saugoti</button>
                        </div>
                </form>
            </div> 
        </>
    )
}
export default AddProject