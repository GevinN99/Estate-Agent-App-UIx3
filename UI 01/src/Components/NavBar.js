import React from 'react';
import {Link} from 'react-router-dom';

export default function TopNavigation() {
    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#topNav" aria-controls="topNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="topNav">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/properties">Properties</Link>
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </div>
                        <div className="navbar-nav">
                            <Link className="nav-link float-end text-danger" aria-current="page" to="/logout">Log out</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
