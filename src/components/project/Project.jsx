import { Link, useParams, useNavigate } from "react-router-dom";
import * as service from "../../services/ProjectCRUDservices";

const Project =(props) =>{
    const navigate = useNavigate();
    const {id} = useParams();

    return(
        <>
            <div className="col" key={props.id}>
            <div className="card h-100">
    <div className="card-body d-flex justify-content-between align-items-start">
        <div>
            <h5 className="card-title">{props.name}</h5>
            <p>{props.id}</p>
            <p className="card-text mb-1"><strong>Start Date:</strong> {props.from}</p>
            <p className="card-text mb-1"><strong>End Date:</strong> {props.to}</p>
            <p className="card-text text-secondary">10 Tasks</p>
        </div>
        <div>
            <Link
                to={`/updateproject/${props.id}`}
                className="btn btn-sm btn-outline-primary border-0 me-2"
            >
                <i className="bi bi-pencil"></i>
            </Link>
            <Link
                to={`/projectview/${props.id}`}
                className="btn btn-sm btn-outline-primary border-0 me-2"
            >
                <i className="bi bi-clipboard"></i>
            </Link>
        </div>
    </div>
</div>

            </div>
        </>
    )
}

export default Project