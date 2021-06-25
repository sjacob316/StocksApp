import { AxiosResponse } from 'axios';
import React, { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { AuthenticationService } from './Services/AuthenticationService';

// import { createContext, useContext } from "react"
export type UserContent = {
  copy: string[]
  setCopy:Dispatch<SetStateAction<string[]>>;
}
export const UserContext = createContext<UserContent>({
copy: [], // set a default value
setCopy: () => {},
})
export const useGlobalContext = () => useContext(UserContext)

// export const UserContext = createContext([null]);
// export const UserProvider = (props: any) => {
//     const [userObject, setUserObject] = useState<any>(undefined);
//     return (
//         <UserContext.Provider value={{userObject, setUserObject}}>{props.children}</UserContext.Provider>
//     )
// }