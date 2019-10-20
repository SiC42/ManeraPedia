import config from 'config';
import axios from 'axios';

export const loginService = {
    login,
    logout,
    //TODO: register,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    const body = JSON.stringify({ username, password });
    return axios.post(`${config.apiUrl}/login`, body, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user.info;
        })
        .catch(handleError);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleError(error) {
    if(error.response) {
        console.log(error.toJSON())
        return Promise.reject(error.toJSON());
    }
}

function handleResponse(response) {
    return response.data;
}