import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AdminNavbar from "../../../components/Navbars/AdminNavbar_Default.js";
import AdminFooter from "../../../components/Footer/AdminFooter.js";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from 'axios'

import routes from "./../../../routes";
import { Container } from 'reactstrap';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user: {},
            mess: '',
            sidenav: true
        }
        this.logout = this.logOut.bind(this)
        this.toggleSide = this.toggleSide.bind(this)
    }
    logOut() {
        axios.post('/api/logout')
            .then(response => {
                let appState = {
                    isLoggedIn: false,
                    user: {}
                }
                localStorage['appState'] = JSON.stringify(appState)
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: '',
                    mess: response.data.message
                })
                location.href = location.origin + '/'

            })
    }

    // toggles collapse between opened and closed (true/false)
    toggleSide(e) {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned")
            document.body.classList.add("g-sidenav-hidden")
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }
        this.props.history.sidenavOpen = !this.props.history.sidenavOpen
        this.setState({
            sidenav: !this.state.sidenav
        })
    };

    componentDidMount() {
        let state = localStorage['appState']
        if (state) {
            let AppState = JSON.parse(state)
            this.setState(prevState => ({
                ...prevState,
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            }))
        }
    }

    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }
    getRoutes(routes) {
        return routes.map((prop, key) => {
            if (prop.layout === "/dashboard") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else if (prop.views.length > 0) {
                return prop.views.map((view, key) => {
                    if (view.layout === "/dashboard") {
                        return (
                            <Route
                                path={view.layout + view.path}
                                component={view.component}
                                key={key}
                            />
                        );
                    } else return null
                })
            }
            else {
                return null;
            }
        });
    };
    getBrandText(path) {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    render() {
        return (
            <>
                <Sidebar
                    {...this.props}
                    logOut={this.logout}
                    routes={routes}
                    sNOpen={this.toggleSide}
                    sOpen={this.state.sidenav}
                    logo={{
                        innerLink: "/",
                        imgSrc: "../../../../argon/img/brand/mlgsd.png",
                        imgAlt: "..."
                    }}
                />
                <div className='main-content bg-gray-200 h-full' ref="mainContent">
                    <AdminNavbar
                        {...this.props}
                        logOut={this.logout}
                        side={this.toggleSide}
                        sno={this.state.sidenav}
                        brandText={this.getBrandText(this.props.location.pathname)}
                    />
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect from="*" to="/dashboard/index" />
                    </Switch>
                </div>
                {this.state.sidenav ? (
                    <div className="backdrop d-xl-none" onClick={this.toggleSide} />
                ) : null}
            </>
        )
    }
}

export default Home
