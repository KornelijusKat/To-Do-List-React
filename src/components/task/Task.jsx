


const Task = (props) =>{
    return (
        <div className="task m-1">
            <p><strong>Name:</strong> {props.name}</p>
            <p><strong>description:</strong> {props.description}</p>
            <p><strong>Priority:</strong> {props.priority}</p>
            <p><strong>Due Date:</strong> {props.to}</p>
            <p><strong>------------------------</strong></p>
        </div>
    );
};


export default Task