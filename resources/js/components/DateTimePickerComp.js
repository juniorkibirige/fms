import React, {Component} from 'react'

import {Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap'
import ReactDatetimeClass from "react-datetime";

class Datepicker extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                <Col>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-calendar-grid-58"/>
                                </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetimeClass
                                timeFormat={false}
                                onChange={this.props.onChange}
                                inputProps={this.props.inputProps}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default Datepicker
