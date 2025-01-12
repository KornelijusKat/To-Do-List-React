const validateAddProject = (formData) => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Project name is required.";
        }
        if (!formData.description.trim()) {
            errors.description = "Project description is required.";
        }
        if (!formData.from) {
            errors.from = "Project start date is required.";
        }
        if (!formData.to) {
            errors.to = "Project end date is required.";
        }
        if (formData.from && formData.to && new Date(formData.from) > new Date(formData.to)) {
            errors.date = "Start date cannot be after end date.";
        }
        return errors;
    };
export default validateAddProject