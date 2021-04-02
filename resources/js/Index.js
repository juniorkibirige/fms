import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Main from './Router';
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
// plugins styles downloaded
import "./../../public/argon/vendor/fullcalendar/dist/fullcalendar.min.css";
import "./../../public/argon/vendor/sweetalert2/dist/sweetalert2.min.css";
import "./../../public/argon/vendor/select2/dist/css/select2.min.css";
import "./../../public/argon/vendor/quill/dist/quill.core.css";
import "./../../public/argon/vendor/nucleo/css/nucleo.css";
import "./../../public/argon/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
// import "layouts/Documentation/assets-for-demo/docs.scss";
// import "layouts/Documentation/assets-for-demo/react-docs.scss";
import "./../../public/argon/css/main.3eb61e62.chunk.css";
import './../../public/argon/css/chunk.css'
class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={Main} /> 
            </BrowserRouter>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById('root'))
