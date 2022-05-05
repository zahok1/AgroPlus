const register = () => {
    let firstName = document.getElementById("firstname").value
    let lastName = document.getElementById("lastname").value
    let email = document.getElementById("email").value
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    event.preventDefault()
    fetch('http://localhost:5000/api/user/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password
        })
    }).then(res => {
        res.json().then(body => console.log(body));
        location.href = "/home"
    })
}
