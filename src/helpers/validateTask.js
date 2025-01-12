const validateTask = (project, formData) => {
    const validationErrors = {};
    if (!formData.to) {
        validationErrors.to = "Task deadline is required.";
    } else if (project) {
        if (new Date(formData.to) < new Date(project.from)) {
            validationErrors.to = `Deadline cannot be before the project start date (${project.from}).`;
        }
        if (new Date(formData.to) > new Date(project.to)) {
            validationErrors.to = `Deadline cannot be after the project end date (${project.to}).`;
        }
    }
    return validationErrors;
}
export default validateTask