window.onload = () => {
    fetch("http://localhost:3000/", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwtToken")
        }
    })
        .then(res => res.json())
        .then((data) => {
            if (data.status != 200) {
                console.log("you are not authenicated");
                document.getElementById("head").innerHTML = `You are not authenticated
        <a href="/Frontend/login.html">Login here</a>
        `;
                return;
            }
            document.getElementById("head").innerHTML = "Logged In <button id='logout' class='btn btn-primary'>Logout</button>"
        })
        .then(() => {
            try {
                document.getElementById("logout").addEventListener("click",() => {
                    localStorage.removeItem("jwtToken");
                    document.getElementById("head").innerHTML = `You are not authenticated
        <a href="/Frontend/login.html">Login here</a>
        `;
                })
            } catch (error) {
                
            }
        })
}