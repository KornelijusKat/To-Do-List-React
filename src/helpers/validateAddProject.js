const validateAddProject = (formData) => {
    if (!formData.name.trim()) {
        alert("Project name is required.");
        return false;
    }
    if (!formData.description.trim()) {
        alert("Project description is required.");
        return false;
    }
    if (!formData.from || !formData.to) {
        alert("Project start and end dates are required.");
        return false;
    }
    if (new Date(formData.from) > new Date(formData.to)) {
        alert("Start date cannot be after end date.");
        return false;
    }
    return true;
};
export default validateAddProject