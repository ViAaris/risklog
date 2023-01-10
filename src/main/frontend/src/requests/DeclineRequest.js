

export function DeclineRequest(event, request) {
    event.preventDefault();
    fetch('/api/admin/requests/' + request.id, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": request.id,
            "username": request.username,
            "projectId": request.projectId,
            "userId": request.userId,
            "status": 'declined'
        })
    }).then(response => response.json())
        .then(window.location.reload())
        .then(data => console.log(data));

}