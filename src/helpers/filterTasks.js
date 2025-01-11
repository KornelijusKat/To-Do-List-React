export const filterByPriorityAndDueDate = (filter, tasks) =>{
   return tasks.filter(
        (task) =>{
            const taskDate = task.to; 
            const taskNameOrPriorityMatches =
                task.name.toLowerCase().includes(filter.toLowerCase()) ||
                task.priority.toLowerCase().includes(filter.toLowerCase());
            const taskDateMatches = taskDate.includes(filter);       
            return taskNameOrPriorityMatches || taskDateMatches;
        }
      )
}
export const filterByTaskStatus = (filter, tasks) => {
    console.log(filter)
    console.log(tasks)
    return tasks.filter((task) =>{
        return task.status?.toLowerCase().includes(filter.toLowerCase())
    })  
}