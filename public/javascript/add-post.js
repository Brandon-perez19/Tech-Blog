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
    })

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#new-post').addEventListener('submit', newPostHandler)