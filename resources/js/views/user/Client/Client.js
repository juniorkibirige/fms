import React, { Component } from "react"
import GuestNavbar from "../../../components/Navbars/GuestNavbar";
import { Link } from "react-router-dom";
import Logo from '../../../../../public/argon/img/brand/mlgsd.png'
import { Button } from "reactstrap";

class Client extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <>
                <GuestNavbar />
                <div className='position-relative overflow-hidden px-0 px-md-3 px-md-5 mb-md-0 mt-md-3 text-center bg-light' style={{ backgroundImage: `url(https://shopping.live:423/images/stall.jpg)`, minHeight: `80vh` }}>
                    <div className="col-md-12 my-3 mx-md-auto mx-0 px-0" style={{ background: `rgba(53,52,53,0.5)` }}>
                        <div className='limiter'>
                            <div className='container-login100' style={{maxHeight: `max-content`}}>
                                <div className='wrap-login100' style={{maxHeight: `max-content`}}>
                                    <fieldset className='login' style={{maxHeight: `max-content`}}>
                                        <form className='login100-form validate-form validate-form-login' style={{maxHeight: `max-content`}}>
                                            <Link className='root' to='/'>
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
                                                    <Link to='/create?prev=guest'>
                                                        <Button className='btn btn-lg text-white' style={{ backgroundColor: `darkviolet` }}>Complain Now</Button>
                                                    </Link>
                                                </p>
                                            </div>
                                        </form>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        {/* <h1 className='display-4 font-weight-normal' style={{color: `floralwhite`}}>

                        </h1> */}
                    </div>
                </div>
            </>
        )
    }
}

export default Client