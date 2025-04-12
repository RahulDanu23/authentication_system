function showForm(formId) {
    document.querySelectorAll('.form-box').forEach(form => {
        if (form.id === formId) {
            form.classList.add('active'); 
        } else {
            form.classList.remove('active'); 
        }
    });
}
