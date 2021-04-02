import React, { Component } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Logo from '../../../../public/argon/img/brand/mlgsd.png'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }

    /// Check whether user is authed and store auth data as states if true
    UNSAFE_componentWillMount() {
        let state = localStorage['appState']
        if (state) {
            let AppState = JSON.parse(state)
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            })
        }
    }

    render() {
        return (
            <>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} locNow={`home`} />
                <div className='limiter'>
                    <div className='container-login100'>
                        <div className='wrap-login100'>
                            <fieldset className='login'>
                                <form className='login100-form validate-form validate-form-login'>
                                    <Link className='root' to='/admin'>
                                        <img src={Logo} className='d-block mx-auto mt-4' style={{ width: `150px`, height: `120px`, marginTop: `100px` }} />
                                    </Link>
                                    <span className="login100-form-title p-b-43 mt-3">
                                        Got a professional issue with Uganda Police?
                                    </span>
                                    <div className='small mt-2 text-center'>
                                        <p className='text-violet'>
                                            <span style={{ fontSize: `12px`, fontWeight: `bold`, color: `darkviolet` }}>
                                                Lodge your complaint through our system.
                                            <br />
                                            Confidentiality is guaranteed.
                                            </span>
                                        </p>
                                    </div>
                                    <div className='small mt-2 text-center'>
                                        <p className='text-violet'>
                                            <Link to='/register'>
                                                <Button className='btn btn-lg text-white' style={{ backgroundColor: `darkviolet` }}>REGISTER NOW</Button>
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </fieldset>
                            <div className='p-lg-5 login100-more' style={{ backgroundImage: `url('argon/img/brand/bg-01.jpg')`, backgroundColor: `rgba(25,25,25,0.9)`, backgroundBlendMode: `soft-light` }}>
                                <h1 className='display-4 font-weight-normal text-center text-white' style={{ width: `max-content`, margin: 25 + '% ' + 50 + '% ' + 0 + '% ' + `20px`, fontSize: `40px` }}>
                                    Uganda Police Standards Unit
                                </h1>
                                <p className='lead font-weight-normal text-white' style={{ width: 25 + 'rem', margin: 20 + '% ' + 35 + '% ' + 0 + '% ' + 20 + '% ' }}>
                                    <small>Enabling a professional Police Service</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='header bg-gradient-primary py-7 py-lg-8'>
                    <div className='container'>
                        <span>Whatever will go into the home/index page</span>
                    </div>
                </div> */}
                {/* <Footer /> */}
            </>
        )
    }
}

export default Home