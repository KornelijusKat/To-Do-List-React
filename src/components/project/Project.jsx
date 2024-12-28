import { Link, useParams, useNavigate } from "react-router-dom";
import * as service from "../../services/ProjectCRUDservices";

const Project =(props) =>{
    const navigate = useNavigate();
    const {id} = useParams();
    
    const deleteHandler = ()=>{
        service.deleteProject(props.id);
        navigate('/projects');
    }

    return(
        <>
            <div className="col">
                <div className="card h-100">
                    <div className="card-body d-flex justify-content-between align-items-start">
                        <div>
                            <h5 className="card-title">{props.name}</h5>
                            <p className="card-text mb-1"><strong>Start Date:</strong>{props.from}</p>
                            <p className="card-text mb-1"><strong>End Date:</strong>{props.to}</p>
                            <p className="card-text text-secondary">10 Tasks</p>
                        </div>
                        <button className="btn btn-sm btn-outline-danger border-0" onClick={deleteHandler}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project