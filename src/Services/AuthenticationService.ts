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
        return axios.post('/auth/register-user', data)
    },

    loginUser(email: string, password: string) {
        let data = {
            email,
            password
        }
        return axios.post('/auth/login', data)
    },

    loginWithGoogle() {
        return axios.get("/api/auth/google")
    },

    verifyAuthentication() {
        return axios.post('/api/verify-token')
    },

    getUserData() {
        return axios.get("/auth/getuser", { withCredentials: true })
    },

    logoutUser() {
        return axios.get("/auth/logout")
    }
}
