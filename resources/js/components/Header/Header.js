import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { animObject } from "highcharts";
import { Nav, Button, Row, Col } from "reactstrap";

class Header extends Component {
    // 1.1
    constructor(props) {
        super(props);
        this.state = {
            user: props.userData,
            isLoggedIn: props.userIsLoggedIn
        }
        this.logOut = this.logOut.bind(this)
    }

    // 1.2
    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {}
        }
        localStorage["appState"] = JSON.stringify(appState)
        this.setState(appState)
        this.props.history.push("/")
    }

    render() {
        const aStyle = {
            cursor: "pointer"
        }

        return (
            <nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark" style={{ zIndex: `999` }}>
                <div className="container">
                    <Link className="navbar-brand d-none d-sm-inline-block" to="/">
                        <img src="/favicon.svg" /> <span className="">UG Police Web</span>
                    </Link>
                    <Link className="navbar-brand d-inline-block d-sm-none" to="/">
                        <img src="/favicon.svg" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{color: "black"}}></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbar-collapse-main">
                        <div className="navbar-collapse-header d-md-none">
                            <div className="row" >
                                <div className="col-6 collapse-brand">
                                    <Link to="/">
                                        <img src="argon/img/brand/favicon.png" />
                                    </Link>
                                </div>
                                <div className="col-6 collapse-close">
                                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav" onClick={() => { $('#navbar-collapse-main').toggleClass('show') }}>
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="navbar-nav ml-auto">
                            {
                                this.state.isLoggedIn == true ?
                                    <li className="nav-item">
                                        <Link className="nav-link nav-link-icon" to="/dashboard">
                                            <i className="ni ni-planet" style={{ color: "black" }}></i>
                                            <span className="nav-link-inner--text" style={{ color: "black" }}>Dashboard</span>
                                        </Link>
                                    </li>
                                    : ""
                            }
                            {
                                this.state.isLoggedIn == false && this.props.locNow != 'login' ?
                                    <>
                                        <li className="nav-item" style={{ color: `black` }}>
                                            <Link className="nav-link nav-link-icon mx-auto" to="/login">
                                                <span className="nav-link-inner--text font-weight-bold" style={{ color: "purple" }}>Login &nbsp;&nbsp;</span>
                                                <i className='fa fa-angle-right' style={{color: `black`}}></i>
                                            </Link>
                                        </li>
                                        {this.props.locNow == 'home' ? "" :
                                            <li className="nav-item" style={{ color: `black` }}>
                                                <Link className="nav-link nav-link-icon" to="/register">
                                                    <i className="ni ni-circle-08" style={{ color: "black" }}></i>
                                                    <span className="nav-link-inner--text font-weight-bold" style={{ color: "purple" }}>Register</span>
                                                </Link>
                                            </li>
                                        }
                                    </>
                                    : ""
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Header)
