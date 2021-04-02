import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import FlashMessage from 'react-flash-message'
import axios from 'axios'
import { Row, Col, Form, FormGroup, Input, Button } from 'reactstrap'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

class RegisterContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isRegistered: false,
            error: '',
            errorMessage: '',
            formSubmitting: false,
            user: {
                name: '',
                email: '',
                password: '',
                password_conf: ''
            },
            redirect: props.redirect
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
    }

    UNSAFE_componentWillMount() {
        let state = localStorage['appState']
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            })
            if (this.state.isRegistered) {
                return this.props.history.push("/dashboard")
            }
        }
    }

    componentDidMount() {
        const { prevLocation } = this.state.redirect.state ||
            { prevLocation: { pathname: '/dashboard' } }
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation)
        }
    }

    handleSubmit(e) {
        event.preventDefault()
        this.setState({
            formSubmitting: true
        })
        ReactDOM.findDOMNode(this).scrollIntoView()
        if (this.state.user.password == this.state.user.password_conf) {
            let userData = {
                name: this.state.user.name,
                email: this.state.user.email,
                password: this.state.user.password,
                password_confirmation: this.state.user.password_conf,
            }
            axios.post('/api/register', userData)
                .then(response => {
                    return response
                })
                .then(json => {
                    if (json.data.success) {
                        let userData = {
                            name: json.data.id,
                            email: json.data.name
                        }
                        let appState = {
                            isRegistered: true,
                            user: userData
                        }
                        localStorage['appState'] = JSON.stringify(appState)
                        this.setState({
                            isRegistered: appState.isRegistered,
                            user: appState.user
                        })
                        location.reload()
                    } else {
                        alert(`Our System failed to Register your Account! Please Try Again`);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        /// The request was made and the server responded with a status code that falls out of the range of 2xx
                        let err = error.response.data
                        this.setState({
                            error: err.message,
                            errorMessage: err.errors,
                            formSubmitting: false
                        })
                    } else if (error.request) {
                        /// The request was made but no response was received
                        /// `error.request` is an instance of XMLHttpRequest 
                        let err = error.request
                        this.setState({
                            error: err,
                            formSubmitting: false
                        })
                    } else {
                        // Something during setup triggered the error
                        let err = error.message
                        this.setState({
                            error: err,
                            formSubmitting: false
                        })
                    }
                })
                .finally(
                    this.setState({
                        error: ''
                    })
                )
        } else {
            this.setState({
                error: `Passwords don't match!`,
                formSubmitting: false
            })
            let pass = $('#password')
            let passc = $('#password_conf')
            pass.parent().addClass('has-danger')
            pass.addClass('is-invalid')
            passc.parent().addClass('has-danger')
            passc.addClass('is-invalid')
        }
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
        let errorMessage = this.state.errorMessage
        let arr = []
        Object.values(errorMessage).forEach((value) => {
            arr.push(value)
        })

        return (
            <>
                <Header userData={this.state.user} userIsLoggedIn={false} />
                <div className='header bg-gradient-primary py-7 py-lg-8'>
                    <div className='container'>
                        <Row>
                            <Col className='offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md 12 col-sm-12 col-12'>
                                <h2>Create your Account</h2>
                                {
                                    this.state.isRegistered
                                        ? <FlashMessage duration={60000} persistOnHover={true}>
                                            <h5 className={"alert alert-success text-center"}>Registration successful, redirecting...</h5>
                                        </FlashMessage>
                                        : ''
                                }
                                {
                                    this.state.error
                                        ? <FlashMessage duration={900000} persistOnHover={true}>
                                            <h5 className='alert alert-danger text-center'>Error: {this.state.error}</h5>
                                            <ul>
                                                {
                                                    arr.map((item, i) => (
                                                        <li key={i}><h5 style={{ color: 'red' }}>{item}</h5></li>
                                                    ))
                                                }
                                            </ul>
                                        </FlashMessage>
                                        : ''
                                }
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Input
                                            id='name'
                                            className='form-control'
                                            type='text'
                                            name='name'
                                            placeholder="name"
                                            required
                                            onChange={this.handleFieldChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            id='email'
                                            type='email'
                                            name='email'
                                            placeholder="Email Address"
                                            className='form-control'
                                            required
                                            onChange={this.handleFieldChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            id='password'
                                            type='password'
                                            name='password'
                                            className='form-control is-invalid'
                                            placeholder="Password"
                                            className='form-control'
                                            required
                                            onChange={this.handleFieldChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            id='password_conf'
                                            type='password'
                                            name='password_conf'
                                            placeholder="Repeat password"
                                            className='form-control'
                                            required
                                            onChange={this.handleFieldChange}
                                        />
                                    </FormGroup>
                                    <Button type='submit'
                                        name="singlebutton"
                                        className='btn btn-default btn-lg btn-block mb-10'
                                        disabled={this.state.formSubmitting ? true : false}
                                    >Create Account</Button>
                                </Form>
                            </Col>
                            <div className="container pt-2">
                                <div className="row">
                                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-6 col-sm-12 col-12">
                                        <span className='pull-left'>
                                            Already have an account? &nbsp;
                                            <Link to='/login' className='text-yellow'>Login</Link>
                                        </span>
                                        <span className='pull-right float-right'>
                                            <Link to='/' className="text-white">Back to Index</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default withRouter(RegisterContainer)