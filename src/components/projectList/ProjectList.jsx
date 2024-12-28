import Project from "../project/Project";
const ProjectList = (props) =>{
    return(
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {props.data?.map(project=> <Project
            id= {project.id}
            name= {project.name}
            description= {project.description}
            from= {project.from}
            to= {project.to}
            uid= {project.uid}
            />)}

        </div>
    )
}

export default ProjectList;