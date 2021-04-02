import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import FlashMessage from 'react-flash-message'
import Header from '../../components/Header/Header'
import axios from 'axios'
import Logo from '../../../../public/favicon.svg'
import { Button } from 'reactstrap'

class LoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            error: '',
            formSubmitting: false,
            user: {
                email: '',
                password: ''
            },
            redirect: props.redirect
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
    }

    UNSAFE_componentWillMount(){
        let state = localStorage['appState']
        if (state) {
            let AppState = JSON.parse(state)
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            })
        }
    }

    componentDidMount() {
        const { prevLocation } = this.state.redirect.state ||
        {
            prevLocation: { pathname: '/dashboard' }
        }
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation)
        }
    }

    handleSubmit() {
        event.preventDefault()
        this.setState({
            formSubmitting: true
        })
        let userData = {
            email: this.state.user.email,
            password: this.state.user.password
        };
        axios.post("/api/login", userData)
            .then(res => {
                return res
            }).then(json => {
                if (json.data.success) {
                    let userData = {
                        id: json.data.id,
                        name: json.data.name,
                        email: json.data.email,
                        access_token: json.data.access_token,
                        api_token: json.data.api_token
                    }
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    }
                    localStorage['appState'] = JSON.stringify(appState)
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user,
                        error: ''
                    })
                    location.reload()
                } else {
                    alert(`Our system failed to Login! Please try Again!`)
                }
            }).catch(error => {
                if (error.response) {
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false
                    })
                } else if (error.request) {
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                } else {
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                }
            }).finally(this.setState({
                error: ''
            }))
    }

    handleFieldChange() {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [event.target.name]: event.target.value
            }
        }))
    }

    render() {
        const { state = {} } = this.state.redirect
        const { error } = state

        return (
            <>
                <Header userData={this.state.user} userIsLoggedIn={false} locNow={`login`} />
                <div className='header py-7 py-lg-8 col-lg-12 col-12' style={{ backgroundImage: `url('argon/img/brand/bg-01.jpg')`, backgroundColor: `rgba(25,25,25,0.9)`, backgroundBlendMode: `soft-light` }}>
                    <div className='container'>
                        <div className='row'>
                            <div style={{ borderRadius: `5px`, paddingTop: `3rem`, paddingBottom: `3rem` }} className=" ml-sm-7 bg-secondary offset-xl-2 col-xl-4 offset-lg-2 col-lg-7 offset-md-0 col-md-12 offset-0 col-sm-12 col-12">
                                <h1 className='text-center' style={{ color: `#570f75` }}>
                                    Admin Login
                                    <p className='px-md-5'>
                                        <span className='small text-center'>
                                            Add your credentials here to access the administrative dashboard.
                                    </span>
                                    </p>
                                </h1>

                                {
                                    this.state.isLoggedIn
                                        ? <FlashMessage duration={60000} persistOnHover={true}>
                                            <h5 className={"alert alert-success text-center"}>Login successful, redirecting...</h5>
                                        </FlashMessage>
                                        : ''
                                }
                                {
                                    this.state.error
                                        ? <FlashMessage duration={900000} persistOnHover={true}>
                                            <h5 className='alert alert-danger text-center'>Error: {this.state.error}</h5>
                                            <ul>
                                                {
                                                   typeof this.state.errorMessage !== 'undefined' ?
                                                    this.state.errorMessage.map((item, i) => (
                                                        <li key={i}><h5 style={{ color: 'red' }}>{item}</h5></li>
                                                    )): ""
                                                }
                                            </ul>
                                        </FlashMessage>
                                        : ''
                                }
                                {
                                    error && !this.state.isLoggedIn ?
                                        <FlashMessage duration={100000} persistOnHover={true}>
                                            <h5 className='alert alert-danger'>Error: {error}</h5>
                                        </FlashMessage>
                                        : ''
                                }
                                <form onSubmit={this.handleSubmit}>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend" style={{ height: `2rem` }}>
                                                    <span className="input-group-text" style={{ backgroundColor: `#cdd4d9` }}>
                                                        <i className="ni ni-single-02 text-black"></i>
                                                    </span>
                                                </div>
                                                <input name="email" onChange={this.handleFieldChange} required className="form-control pl-3" placeholder="Username or Email" type="text" style={{ borderColor: `#cad1d7`, height: `2rem` }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend" style={{ height: `2rem` }}>
                                                    <span className="input-group-text" style={{ backgroundColor: `#cdd4d9` }}>
                                                        <i className="ni ni-key-25 text-black"></i>
                                                    </span>
                                                </div>
                                                <input name="password" onChange={this.handleFieldChange} required className="form-control pl-3" placeholder="Password" type="password" style={{ borderColor: `#cad1d7`, height: `2rem` }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-12">
                                            <span className='pull-right float-right'>
                                                <Link to='/' style={{ color: `#570f75` }}>Forgot password?</Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='mt-2 text-center'>
                                        <Button type='submit' name='singlebutton' disabled={this.state.formSubmitting} className='btn btn-sm text-white px-5' style={{ backgroundColor: `#570f75` }}> {this.state.formSubmitting ? "Logging you in ... " : "Login"}</Button>
                                    </div>
                                    {/* <button disabled={this.state.formSubmitting}
                                        type="submit"
                                        name="singlebutton"
                                        className='btn btn-default btn-lg btn-block mb10'
                                    > {this.state.formSubmitting ? "Logging you in ... " : "Login"}</button> */}
                                </form>
                            </div>
                            <div style={{ borderRadius: `7px`, marginLeft: `10em !important` }} className="text-center p-lg-5 p-md-4 pt-sm-7 ml-7 offset-xl-1 col-xl-4 offset-lg-1 d-none d-sm-none d-md-block col-lg-7 offset-md-0 col-md-12 offset-0 col-sm-12 col-12">

                                <Link className='root' to='/'>
                                    <img src={Logo} className='d-block mx-auto mt-4' style={{ width: `150px`, height: `120px`, marginTop: `100px` }} />
                                </Link>
                                <div className='align-middle text-white' style={{ fontSize: `40px` }}>
                                    OWC
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(LoginContainer)
