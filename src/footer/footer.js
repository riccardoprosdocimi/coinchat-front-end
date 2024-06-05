import React from 'react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="https://github.com/riccardoprosdocimi/coinchat-front-end"
                               target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-github fa-lg"></i>
                                <span className="ms-2">View the source code</span>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="https://www.linkedin.com/in/riccardo-prosdocimi/"
                               target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin fa-lg"></i>
                                <span className="ms-2">Connect with me on LinkedIn</span>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="https://ricpro.net"
                               target="_blank" rel="noopener noreferrer">
                                <i className="fa-solid fa-laptop-code fa-lg"></i>
                                <span className="ms-2">Check out my portfolio</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;