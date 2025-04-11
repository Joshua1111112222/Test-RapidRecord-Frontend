const BACKEND_URL = 'https://your-backend-url.onrender.com'; // Replace with your backend URL

function viewUserHistory() {
  const username = document.getElementById('username-input').value.trim();

  if (!username) {
    alert('Please enter a username.');
    return;
  }

  // Fetch the student's history from the backend
  fetch(`${BACKEND_URL}/get-student-history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch student history.');
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // Display the student's history
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = ''; // Clear previous history

        if (data.history.length === 0) {
          historyList.innerHTML = '<li>No history available for this student.</li>';
        } else {
          data.history.forEach((entry) => {
            const li = document.createElement('li');
            li.innerText = `${entry.date}: ${entry.hours} hours`;
            historyList.appendChild(li);
          });
        }

        // Show the history section
        document.getElementById('student-history').classList.remove('hidden');
      } else {
        alert(data.message || 'Failed to fetch student history.');
      }
    })
    .catch((error) => {
      alert(error.message || 'Error fetching student history.');
    });
}