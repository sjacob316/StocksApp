import moment from 'moment';
import React from 'react';
import axios from "./AxiosService";


export const AuthenticationService = {
    registerUser(firstName: string, lastName: string, email: string, password: string) {
        let data = {
            firstName,
            lastName,
            email,
            password
        }
        console.log(data);
        return axios.post('/api/auth/register-user', data)
    },

    loginUser(email: string, password: string) {
        let data = {
            email,
            password
        }
        return axios.post('/api/auth/login', data)
    },

    logoutUser() {
        return axios.post("/api/auth/logout")
    }
}
