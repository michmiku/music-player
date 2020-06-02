import React, { createContext, useState } from 'react'

export const AuthenticatedUser = createContext();

const AuthenticatedUserProvider = (props) => {
    const [authUser, setAuthUser] = useState({ username: localStorage.getItem('user'), admin: localStorage.getItem('admin') })

    return (
        <AuthenticatedUser.Provider value={{ authUser, setAuthUser: setAuthUser }}>
            {props.children}
        </AuthenticatedUser.Provider>
    );
}

export default AuthenticatedUserProvider;