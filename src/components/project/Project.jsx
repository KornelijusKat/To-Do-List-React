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
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
                <div class="card h-100">
                    <div class="card-body d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="card-title">Project Name</h5>
                            <p class="card-text mb-1"><strong>Start Date:</strong> 2024-01-01</p>
                            <p class="card-text mb-1"><strong>End Date:</strong> 2024-12-31</p>
                            <p class="card-text text-secondary">10 Tasks</p>
                        </div>
                        <button class="btn btn-sm btn-outline-danger border-0" onclick={deleteHandler}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Project