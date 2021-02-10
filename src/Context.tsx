import { AxiosResponse } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { AuthenticationService } from './Services/AuthenticationService';

export const myContext = createContext({});
export default function Context(props: any) {
    const [userObject, setUserObject] = useState<any>();
    useEffect(() => {
        AuthenticationService.getUserData().then((res: AxiosResponse) => {
            if(res.data) {
                setUserObject(res.data);
            }
        })
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}