import {getCSRFToken} from "./getCSRFToken";
import AuthenticationService from "./AuthenticationService";

export function SendRequest(event, id) {
    event.preventDefault();
    fetch('/api/requests', {
        method: 'POST',
        withCredentials: true,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        body: JSON.stringify({
            "username": AuthenticationService.getLoggedInUserName(),
            "userId": AuthenticationService.getId(),
            "projectId": id
        })
    }).then(response => response.json())
        .then(data => console.log(data));

}