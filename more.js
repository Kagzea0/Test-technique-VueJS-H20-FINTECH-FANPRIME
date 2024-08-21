document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.taskCheckbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const listItem = event.target.parentNode;
            const taskText = listItem.querySelector('span');

            if (event.target.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }
        });
    });
});
