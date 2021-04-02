import React, { Component } from 'react'
import { Nav, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

class GuestNavbar extends Component {

    pullDown() {
        pdu = $('.pull-down')
        if ($(':first-child', pdu)[1]
          .attributes[1]
          .value != "M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z") {
          $('.sm').addClass('disp')
          $('.pull-down').css({
             'top': 127.5 + 'px',
             'opacity': '1'
          })
          $(':first-child', pdu)[1]
             .attributes[1]
             .value = "M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"
       } else {
          $('.sm').removeClass('disp')
          $('.pull-down').css({
             'top': 47.5 + 'px',
             'opacity': '0.4'
          })
          $(':first-child', pdu)[1]
             .attributes[1]
             .value = "M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
       }
    }

    mOver() {
        pdu = $('.pull-down')
        pdu.css({
            'opacity': 1,
            'cursor': 'pointer'
        })
    }

    mOut() {
        pdu = $('.pull-down')
        pdu.css({
            'opacity': 0.4,
            'cursor': 'default'
        })
    }

    constructor() {
        super()
        this.state = {
            active: null
        }
    }

    componentDidMount() {
        const params = location.pathname
        switch (params) {
            case 'create':
                this.setState({
                    active: 'create'
                })
                break;
            default:
                break;
        }
    }

    render() {
        require('./../../../../public/argon/css/product.css')
        require('./nav')
        return (
            <>
                <Nav className='site-header sticky-top py-1 bg-light'>
                    <Container className='container d-flex flex-column flex-md-row justify-content-between bg-light'>
                        <Link to='/' className='py-2 '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="d-block mx-auto">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                                <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                                <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                                <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                                <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                                <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                            </svg>
                        </Link>
                        <Link className="py-2 d-none d-md-inline-block" to="/create?prev=guest">Complain</Link>
                        <Link className="py-2 d-none d-md-inline-block sm" to="/create?prev=guest">Complain</Link>
                        <Link className="py-2 d-none d-md-inline-block sm" to="#">SignUp</Link>
                    </Container>
            </Nav>
            <div className='pull-down text-center bg-dark sticky-top' onClick={this.pullDown} onMouseOver={this.mOver} onMouseOut={this.mOut} aria-label='View Navigation' style={{position: `fixed`, zIndex: 1020, top: `47.5px`, width: `100%`, opacity: 0.4, backgroundColor: `white`}}>
                <span className='fa fa-angle-down' val='text'></span>
            </div>
            </>
        );
    }
}

export default GuestNavbar