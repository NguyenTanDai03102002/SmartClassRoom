import { useState, createContext } from 'react';

const Showcontext = createContext();

function ShowProvider({ children }) {
    const [page, setPage] = useState('');

    const value = {
        page,
        setPage,
    };

    return <Showcontext.Provider value={value}>{children}</Showcontext.Provider>;
}

export { Showcontext, ShowProvider };
