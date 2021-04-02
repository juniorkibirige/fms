/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";
// reactstrap components
import {
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Media,
    Nav,
    Navbar,
    NavItem,
    UncontrolledDropdown
} from "reactstrap";

class AdminNavbar extends React.Component {
    render() {
        return (
            <>
                <Navbar className="navbar-top navbar-dark" expand="md" style={{backgroundColor: `darkolivegreen`}}>
                    <Container fluid>
                        <Link
                            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                            to="/"
                            style={{visibility: `hidden`}}
                        >
                            {this.props.brandText}
                        </Link>
                        <Form
                            className="navbar-search navbar-search-dark form-inline mr-3 d-md-flex ml-lg-auto d-none d-md-none"
                            style={{visibility: `hidden`}}>
                            <FormGroup className="mb-0"
                                       style={{visibility: `hidden`}}>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fas fa-search"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Search" type="text"/>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                        <UncontrolledDropdown className='align-items-center ml-md-auto' navbar="true">
                            <NavItem className='d-xl-none'>
                                <div
                                    className={classnames("sidenav-toggler sidenav-toggler-dark d-block d-xl-none", {
                                        active: this.props.sno
                                    })}
                                    onClick={this.props.side}
                                >
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line"/>
                                        <i className="sidenav-toggler-line"/>
                                        <i className="sidenav-toggler-line"/>
                                    </div>
                                </div>
                            </NavItem>
                        </UncontrolledDropdown>
                        <Nav className="align-items-center ml-auto ml-md-0 d-md-flex" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Media className="align-items-center text-black" onClick={this.props.logOut}>
                    <span>
                      <i className="fa fa-angle-left"></i>
                    </span>
                                        <Media className="ml-2 d-lg-block">
                      <span className="mb-0 text-sm text-black font-weight-bold">
                        LOG OUT
                      </span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem className="noti-title" header tag="div">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-single-02"/>
                                        <span>My profile</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-settings-gear-65"/>
                                        <span>Settings</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-calendar-grid-58"/>
                                        <span>Activity</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-support-16"/>
                                        <span>Support</span>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem href="#logout" onClick={this.props.logOut}>
                                        <i className="ni ni-user-run"/>
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default AdminNavbar;
