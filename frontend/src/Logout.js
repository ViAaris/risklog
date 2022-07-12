import AuthenticationService from "./AuthenticationService";
import LoginComponent from "./LoginComponent";




export function Logout(event) {
     localStorage.clear();
     event.preventDefault();

     fetch('/perform_logout', {
         method: 'POST',
         headers: {"X-XSRF-TOKEN": document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1')},
         body: '',
     }).then(r => AuthenticationService.logout())
         .then(window.location.href = '/auth/login');
    AuthenticationService.logout()

 }