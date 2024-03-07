import React from 'react';
import Header from '../header/header';

function Headeronly({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
        </div>
    );
}

export default Headeronly;
