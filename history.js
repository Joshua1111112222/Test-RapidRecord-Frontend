// Variables
let username = localStorage.getItem('username'); // Retrieve username from localStorage
let totalHours = 0;

// Backend URL (replace this with your Flask backend URL)
const BACKEND_URL = ''; // Replace with your backend URL

// Functions to handle the buttons and actions
function updateHoursDisplay() {
    document.getElementById("hours").innerText = `${totalHours} hours`;
}

function submitHours() {
    const hoursInput = document.getElementById('custom-hours');
    const hoursToSubmit = parseInt(hoursInput.value.trim());

    if (isNaN(hoursToSubmit) || hoursToSubmit <= 0) {
        alert("Please enter a valid number of hours.");
        return;
    }

    const currentDate = new Date().toLocaleString();

    // Send data to the Flask backend
    fetch(`${BACKEND_URL}/submit-hours`, {
        method: 'POST',
        body: JSON.stringify({ username: username, hours: hoursToSubmit, date: currentDate }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to submit hours to the backend.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert("Hours submitted successfully!");
            // Optionally, update local log history
            const logHistory = JSON.parse(localStorage.getItem('logHistory')) || [];
            logHistory.push({ date: currentDate, hours: hoursToSubmit });
            localStorage.setItem('logHistory', JSON.stringify(logHistory)); // Save log history
            hoursInput.value = ''; // Clear input
        } else {
            alert("Failed to submit hours: " + data.message);
        }
    })
    .catch(error => {
        alert("Error submitting hours: " + error.message);
    });
}

function showHistory() {
    const logHistory = JSON.parse(localStorage.getItem('logHistory')) || [];
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Clear previous history 
}