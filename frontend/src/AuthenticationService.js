import axios from 'axios'

const API_URL = 'http://localhost:8081'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'username'



class AuthenticationService {



    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {

        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    setAuthorities(username, authorities){
            localStorage.setItem(username + 'Authorities', JSON.stringify(authorities));
    }


    getAuthorities(){
        return JSON.parse(localStorage.getItem(this.getLoggedInUserName()+ 'Authorities'));
    }

    setId(username, id){
        localStorage.setItem(username + 'Id', id);
    }

    getId(){
        return localStorage.getItem(this.getLoggedInUserName() + 'Id');
    }

    logout() {
        localStorage.clear();
        // localStorage.removeItem(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME));
        // localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
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