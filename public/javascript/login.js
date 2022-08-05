
async function loginHandler (event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('api/user/login', {
            method:'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
            
        } else {
            alert(response.statusText)
        }
    }
};

async function signupHandler (event){
    event.preventDefault();

    const email =  document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const username = document.querySelector('#signup-username').value.trim();

    if (email && password && username) {
        const response = await fetch('/api/user', {
            method: 'post',
            body:JSON.stringify({
                email,
                password,
                username
            }),
            headers: {'Content-type': 'application/json'}
        }).then((response) => {
            if(response.ok){
                document.location.replace('/dashboard/')
            } 
            return response.json().then((body) => {
                console.log(body)
                var errorArr = body.errors
                for (let i = 0; i < errorArr.length; i++) {
                    var errorMessage = errorArr[i].message
                    alert(errorMessage)
                }
            })
        })
    }
};

document.querySelector('#login-form').addEventListener('submit', loginHandler);

document.getElementById('signup-form').addEventListener('submit', signupHandler);