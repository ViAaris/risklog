import axios from 'axios'

const API_URL = 'http://localhost:8081'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'token'


class AuthenticationService {


    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    executeBasicAuthenticationService(username, password) {


        const options = {
            method: 'POST',
            withCredentials: true,
            headers: {
                'X-XSRF-TOKEN': this.csrfToken,
                'Authorization': this.createBasicAuthToken(username, password),
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Headers":"Authorization,Content-Type, x-requested-with",
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                //'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        };

       return fetch('/auth/login', options)
            .then(function (response) {
                console.log(response.status);
                if (response.status >= 400 && response.status < 600) {

                    const error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }

                return response.json();
            })
            .catch(function (error) {
                console.log("The error is : " + error);
            });

    }


    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {

        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }


    logout() {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()