import React, { Component } from 'react'
import RegisterContainer from './RegisterContainer'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: props.location
        }
    }

    render() {
        return (
            <RegisterContainer redirect={this.state.redirect} />
        )
    }
}

export default Register