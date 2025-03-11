document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Login successful');
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard.html'; // Redirect after login
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
