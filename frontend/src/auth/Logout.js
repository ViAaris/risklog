import AuthenticationService from "./AuthenticationService";



export function Logout(event) {

    event.preventDefault();
    fetch('/perform_logout', {
        method: 'POST',
        withCredentials: true,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000"
        },
    }).then(response => response.json())
        .then(data => console.log(data));
    AuthenticationService.logout();
    window.location.reload();

    window.location.href = "/auth/login";


}