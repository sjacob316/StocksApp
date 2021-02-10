import React from "react";
import { AuthenticationService } from "../Services/AuthenticationService"

export function ProtectedRoute() {
    const isAuthenticated = AuthenticationService.verifyAuthentication()
    return (
        <></>
    )
}