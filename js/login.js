const url = '';
let stayLoggedIn;
let username;
let password;

if (localStorage.getItem('username') && localStorage.getItem('password')) {
    username = localStorage.getItem('username');
    password = localStorage.getItem('password');
    stayLoggedIn = true;
}

document.querySelector('button#login').addEventListener('click', () => {
    username = document.querySelector('input#username');
    password = document.querySelector('input#password');
    stayLoggedIn = document.querySelector('input#stayLoggedIn').checked;

    if (username.value === '' || password.value === '') {
        alert('Bitte alle felder ausfüllen');
    }

    fetch(`${url}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            window.location.href = `index.html`;
            if (stayLoggedIn) {
                localStorage.setItem('username', username.value);
                localStorage.setItem('password', password.value);
            } else {
                sessionStorage.setItem('username', username.value);
                sessionStorage.setItem('password', password.value);
            }
        } else {
            data.message ? alert(data.message) : alert('Login fehlgeschlagen! Versuche es erneut.');
            localStorage.clear();
        }
    });
});