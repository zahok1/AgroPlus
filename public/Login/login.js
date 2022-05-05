const login = () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    event.preventDefault()
    fetch('http://localhost:5000/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => {
        res.json().then(body => console.log(body))
        location.href("/home")
    })
}