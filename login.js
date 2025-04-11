// login.js
function validateLogin() {
    const enteredUsername = document.getElementById('username').value.trim();

    // List of valid usernames
    const validUsernames = ['student1', 'student2', 'system admin']; 

    // Check if the entered username is valid
    if (validUsernames.includes(enteredUsername.toLowerCase())) {
        // Store the username in localStorage
        localStorage.setItem('username', enteredUsername);

        // Redirect based on the username
        if (enteredUsername.toLowerCase() === 'system admin') {
            window.location.href = 'teacher.html';
        } else {
            window.location.href = 'history.html';
        }
    } else {
        // Show an alert for invalid username
        alert('Invalid username. Please try again.');
    }
}

// Attach the validateLogin function to the form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            validateLogin(); // Call the validation function
        });
    }
});