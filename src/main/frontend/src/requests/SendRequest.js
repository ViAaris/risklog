import AuthenticationService from "../auth/AuthenticationService";

export function SendRequest(event, id) {
    event.preventDefault();
    fetch('/api/requests', {
        method: 'POST',
        withCredentials: true,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": AuthenticationService.getLoggedInUserName(),
            "userId": AuthenticationService.getId(),
            "projectId": id,
            "status": 'pending'
        })
    }).then(response => response.json())
        .then(data => console.log(data));

}