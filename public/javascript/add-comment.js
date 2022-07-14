async function commentHandler (event) {
    event.preventDefault();
    const comment_text = document.querySelector('textarea[name="comment-text"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(post_id, comment_text)

    if(comment_text){
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', commentHandler)