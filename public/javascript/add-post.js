async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const post_content = document.querySelector('input[name="content"]').value;

    const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
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

document.querySelector('#new-post').addEventListener('submit', newPostHandler)