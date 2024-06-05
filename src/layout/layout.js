// Layout.js
import React from 'react';
import Footer from '../footer/footer';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                {children}
            </main>
            <div className="pt-4">
                <Footer/>
            </div>
        </div>
    );
};

export default Layout;