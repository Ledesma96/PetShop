import { createContext, useState } from "react";
export const UserContext = createContext(null);

export const UserProvider =({children}) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
    const [add, setAdd] = useState(0)

    return (
        <UserContext.Provider value={[user, setUser, add, setAdd]}>
            {children}
        </UserContext.Provider>
    )
}