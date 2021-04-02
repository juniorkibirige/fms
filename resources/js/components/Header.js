import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className='navbar navbar-expanded-md navbar-dark navbar-laravel'>
        <div className='container'>
            <ul className="nav nav-pills nav-fill flex-column flex-sm-row" id="tabs-text" role="tablist">
                <li className="nav-item">
                    <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-text-1-tab" href="/" role="tab" aria-controls="tabs-text-1" aria-selected="true">Home</a>
                </li>&nbsp;
                <li className="nav-item">
                    <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-text-1-tab" href="/create" role="tab" aria-controls="tabs-text-1" aria-selected="true">Report Officer</a>
                </li>
            </ul>
        </div>
    </nav>
)

export default Header