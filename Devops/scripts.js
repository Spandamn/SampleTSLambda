const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Fetch login endpoint
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful!') {
            // Redirect to catalog page
            window.location.href = '/catalog';
        } else {
            // Display error message
            alert('Invalid email or password.');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
    });
});
