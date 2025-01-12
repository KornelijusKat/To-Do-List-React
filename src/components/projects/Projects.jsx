import { Link } from "react-router-dom";
import * as service from "../../services/ProjectCRUDservices"
import { useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../services/AuthServices"
import Header from "../app/header/Header";
import ProjectList from "../projectList/ProjectList";
import { useGlobalContext } from "../../context/Context";
import DeleteModal from "../DeleteModal/DeleteModal";
import Loading from "../loading/Loading"

const Projects = () =>{
    const[user, loading, error] = useAuthState(auth)
    const {state, dispatch } = useGlobalContext();
    const deleteProject = () =>{
            service.deleteProject(state.modalId)
            dispatch({ type: "TOGGLE_MODAL", payload: { showModal: false } });           
            }
    if (loading) {
        return <Loading />;
    }
    return(
        <div className="container">
            {state.showModal && <DeleteModal deleteRecord={() =>deleteProject()} />}
            <Header/>
            {state.projects.length > 0? 
                <div className="mt-4">
                    <ProjectList data={state.projects}/>
                </div> : 
                <div className="mt-4">
                    <h1>Ready to start? 
                        <Link style={{ textDecoration: 'none' }} to={'/addproject'}> Create a new project here</Link>
                    </h1>
                </div>
            }
        </div>
    )
}

export default Projects;