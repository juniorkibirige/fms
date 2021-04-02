import React, {Component} from 'react'
import paginationFactory from 'react-bootstrap-table2-paginator'

import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    FormGroup,
    InputGroup,
    InputGroupText,
    Row,
    UncontrolledTooltip
} from 'reactstrap'
import ReactToPrint from 'react-to-print'
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios'

const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: true,
    sizePerPageRenderer: ({options, currSizePerPage, onSizePerPageChange}) => (
        <div className="dataTables_length" id="datatable-basic_length">
            <label>
                Show{" "}
                {
                    <select
                        name='datatable-basic_length'
                        aria-controls="datatable-basic"
                        className="form-control form-control-sm"
                        onChange={e => onSizePerPageChange(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                }{" "}
                entries.
            </label>
        </div>
    )
})

const {SearchBar} = Search;

function statusFormatter(cell, row) {
    if (row.open) {
        return (
            <span>
                <strong style={{color: `green`}}>Open</strong>
            </span>
        )
    } else if (row.underInv) {
        return (
            <span>
                <strong style={{color: `orange`}}>Under Investigation</strong>
            </span>
        )
    } else {
        return (
            <span>
                <strong style={{color: `Red`}}>Closed</strong>
            </span>
        )
    }
}

const columns = [
    {
        dataField: 'id',
        text: 'UID',
        hidden: true
    },
    {
        dataField: 'refNo',
        text: 'Reference No.',
        formatter: cell => {
            return (<span>{cell.toString().split('-')[4]}</span>)
        }
    },
    {
        dataField: 'victimName',
        text: 'Victim Name',
        sort: true
    },
    {
        dataField: 'cDist',
        text: 'District',
        sort: true
    },
    {
        dataField: 'victimAge',
        text: 'Age',
        sort: true
    },
    {
        dataField: 'victimGender',
        text: 'Gender',
        sort: true
    },
    {
        dataField: 'officerName',
        text: 'Offending Officer',
        sort: true
    },
    {
        dataField: 'officerRank',
        text: 'Officer Rank',
        sort: true
    }
    , {
        dataField: 'complaintStatus',
        text: 'Status',
        sort: true,
        formatter: statusFormatter
    }
]

class Tables extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alert: null,
            loading: false,
            page: 1,
            sizePerPage: 10,
            data: [],
            dataTable: [],
            dataChanged: false,
            viewComplaint: {}
        }
        this.copyToClipboardAsTable = this.copyToClipboardAsTable.bind(this)
        this.stateChange = this.stateChange.bind(this)
    }

    componentWillUnmount() {
        this.props.history.prev = 'tables'
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.dataChanged === true) {

        }
    }

    handleDataChange({page, sizePerPage,}) {
        const currIndex = (page - 1) * sizePerPage
        setTimeout(() => {
            this.setState(prevState => ({
                ...prevState,
                page: page,
                loading: false,
                data: this.state.dataTable.slice(currIndex, currIndex + sizePerPage),
                sizePerPage: sizePerPage
            }))
        }, 3000)
        this.setState({
            loading: true
        })
    }

    copyToClipboardAsTable(el) {
        var body = document.body, range, sel
        if (document.createRange && window.getSelection) {
            range = document.createRange()
            sel = window.getSelection()
            sel.removeAllRanges()
            try {
                range.selectNodeContents(el)
                sel.addRange(range)
            } catch (e) {
                range.selectNode(el)
                sel.addRange(range)
            }
            document.execCommand("copy")
        } else if (body.createTextRange) {
            range = body.createTextRange()
            range.moveToElementText(el)
            range.select()
            range.execCommand("Copy")
        }
        this.setState({
            alert: (
                <ReactBSAlert
                    success
                    style={{display: "block", marginTop: `-100px`}}
                    title="Good Job!"
                    onConfirm={() => this.setState({alert: null})}
                    onCancel={() => this.setState({alert: null})}
                    confirmBtnBsStyle="info"
                    btnSize=""
                >Copied to clipboard!</ReactBSAlert>
            )
        })
    }

    stateChange(event) {
        const key = event.target.name
        const element = event.target
        if (confirm("Do you want to change the state?")) {
            this.setState(prevState => ({
                ...prevState,
                viewComplaint: {
                    ...prevState.viewComplaint,
                    open: key === 'open',
                    underInv: key === 'underInv',
                    done: key === 'done'
                },
                dataChanged: true,
                alert: (
                    <ReactBSAlert
                        success
                        style={{display: "block", marginTop: `-100px`}}
                        title="Good Job!"
                        onConfirm={() => this.setState({alert: null})}
                        onCancel={() => this.setState({alert: null})}
                        confirmBtnBsStyle="info"
                        btnSize=""
                    >Complaint Status Changed</ReactBSAlert>
                )
            }))
            axios.patch('/api/form_105/' + this.state.viewComplaint.id + '/status', {
                open: key === 'open' ? "true" : "false", underInv: key === 'underInv' ? "true" : "false",
                done: key === 'done' ? "true" : "false",
                userId: JSON.parse(localStorage['appState']).user.id
            }).then(result => {
                console.log(result.data)
            }).catch(e => {
                console.exception(e)
            })
        }
    }

    render() {
        require('../../variables/main.3eb61e62.chunk.css')
        require('../../../../public/argon/css/datatables.min.css')
        require("../../../../public/argon/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css")
        require("../../../../public/argon/vendor/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css")
        require("../../../../public/argon/vendor/datatables.net-select-bs4/css/select.bootstrap4.min.css")
        require("../../../../public/argon/vendor/datatables.net/js/jquery.dataTables.min.js")
        require("../../../../public/argon/vendor/datatables.net-bs4/js/dataTables.bootstrap4.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/dataTables.buttons.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/buttons.html5.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/buttons.flash.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/buttons.print.min.js")
        require("../../../../public/argon/vendor/datatables.net-select/js/dataTables.select.min.js")
        return (
            <>
                {this.state.alert}
                <>
                    <button
                        id="copy-tooltip"
                        type='button'
                        tabIndex='-1'
                        className='btn btn-primary btn-sm buttons-copy button-html5 d-none'
                        data-toggle='modal'
                        data-target="#showRefNo">
                        New Offence Category
                    </button>
                    <div className="ty-ajax-overlay" id="ajax_overlay"/>
                    <div className="ty-ajax-loading-box" id="ajax_loading_box"/>
                </>
                <div style={{backgroundColor: `#c8c4e196`}}>
                    <ToolkitProvider
                        data={this.state.dataTable}
                        keyField="id"
                        columns={columns}
                        search
                        hover
                        striped
                    >
                        {props => (
                            <div className="py-2 px-4">
                                <Container fluid>
                                    <Row>
                                        <Col xs={12} sm={6}>
                                            <ButtonGroup>
                                                <Button
                                                    className="buttons-copy button-html5"
                                                    color="default"
                                                    size="sm"
                                                    id="copy-tooltip"
                                                    onClick={() => this.copyToClipboardAsTable(document.getElementById("react-bs-table"))}>
                                                    <span>Copy</span>
                                                </Button>
                                                <ReactToPrint
                                                    trigger={() => (
                                                        <Button
                                                            href="#"
                                                            color="default"
                                                            size='sm'
                                                            className='buttons-copy buttons-html5'
                                                            id="print-tooltip"
                                                        >
                                                            Print
                                                        </Button>
                                                    )}
                                                    content={() => this.componentRef}
                                                />
                                            </ButtonGroup>
                                            <UncontrolledTooltip placeholder='top' target="print-tooltip">
                                                This will open a print page with the visible rows of the table.
                                            </UncontrolledTooltip>
                                            <UncontrolledTooltip placeholder='top' target="copy-tooltip">
                                                This will copy to your clipboard the visible rows of the table.
                                            </UncontrolledTooltip>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <div id='datatable-basic_filter'
                                                 className='dataTables_filter px-4 pb-1 float-right'>
                                                <label>
                                                    Search:
                                                    <SearchBar className='form-control-sm'
                                                               placeholder="" {...props.searchProps} />
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                                <BootstrapTable
                                    ref={el => (this.componentRef = el)}
                                    {...props.baseProps}
                                    classes={`table-dark`}
                                    rowStyle={{cursor: "pointer"}}
                                    rowEvents={
                                        {
                                            onClick: (e, row, rowIndex) => {
                                                $('.ty-ajax-loading-box').show()
                                                $('.ty-ajax-overlay').show()
                                                axios.get('/api/form_105/' + row.id).then(result => {
                                                    this.setState({
                                                        viewComplaint: result.data[0]
                                                    })
                                                    $('#copy-tooltip').click()
                                                }).finally(() => {
                                                    $('.ty-ajax-loading-box').hide()
                                                    $('.ty-ajax-overlay').hide()
                                                })
                                                // alert(`clicked on ${row.victimAge} with index: ${row.id}`)
                                            }
                                        }
                                    }
                                    bootstrap4={true}
                                    pagination={pagination}
                                    bordered={true}
                                    noDataIndication="No complaints made"
                                    id="react-bs-table"/>
                            </div>
                        )}
                    </ToolkitProvider>
                </div>
                <div>
                    <div className="modal fade px-2" id="showRefNo" tabIndex="-1" role="dialog"
                         aria-labelledby="showRefNoTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document" style={{maxWidth: `100%`}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="showRefNoTitle">Complaint
                                        Number {this.state.viewComplaint.refNo != undefined ? this.state.viewComplaint.refNo.split('-')[4] : ""}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {
                                        (this.state.viewComplaint.refNo !== undefined) ?
                                            <>
                                                <Row>
                                                    <div className="col-3">
                                                        <FormGroup className="col-12 p-0">
                                                            <InputGroup>
                                                                <InputGroupText className="col-12">
                                                                    <input
                                                                        type="radio"
                                                                        name="open"
                                                                        className="mr-1"
                                                                        checked={this.state.viewComplaint.open !== undefined ? this.state.viewComplaint.open : false}
                                                                        onChange={this.stateChange}
                                                                        disabled={true}
                                                                    /> Open
                                                                </InputGroupText>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-6">
                                                        <FormGroup className="col-12 p-0">
                                                            <InputGroup>
                                                                <InputGroupText className="col-12">
                                                                    <input
                                                                        type="radio"
                                                                        name="underInv"
                                                                        className="mr-1"
                                                                        checked={this.state.viewComplaint.underInv !== undefined ? this.state.viewComplaint.underInv : false}
                                                                        onChange={this.stateChange}
                                                                    />
                                                                    Under Investigation
                                                                </InputGroupText>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-3">
                                                        <FormGroup className="col-12 p-0">
                                                            <InputGroup>
                                                                <InputGroupText className="col-12">
                                                                    <input
                                                                        type="radio"
                                                                        name="done"
                                                                        className="mr-1"
                                                                        checked={this.state.viewComplaint.done !== undefined ? this.state.viewComplaint.done : false}
                                                                        onChange={this.stateChange}
                                                                    />
                                                                    Closed
                                                                </InputGroupText>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </div>
                                                </Row>
                                                <div className="card">
                                                    <div className="card-header" style={{padding: ".7rem"}}>
                                                        <div className="card-title" style={{marginBottom: "unset"}}>
                                                            Complainant Particulars
                                                        </div>
                                                    </div>
                                                    <div className="card-body"
                                                         style={{backgroundColor: "rgba(00,00,00, 0.04)"}}>
                                                        <Row>
                                                            <Col xs={12} md={5}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.05rem"}}>
                                                                                Name:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compName}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12} md={2}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.05rem"}}>
                                                                                Age:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm col-md-4 text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compAge}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12} md={4}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.05rem"}}>
                                                                                Gender:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm col-md-4 text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compGender}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text" style={{
                                                                                height: "2.03rem",
                                                                                marginBottom: ".2rem"
                                                                            }}>
                                                                                Location:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-2 mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compRegion + ` Region`}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-auto mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compDist + ` District`}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-auto mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compCounty + ` County`}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-3 mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compsubCounty}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-auto mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compVillage}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12} md={12}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text" style={{
                                                                                height: "2.03rem",
                                                                                borderRight: "1px solid #dee2e6",
                                                                                marginRight: ".4rem"
                                                                            }}>
                                                                                Contact Information:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm col-md-auto mr-2 text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compGender}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm col-md-auto mr-2 text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.compGender}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" style={{padding: ".7rem"}}>
                                                        <div className="card-title" style={{
                                                            marginBottom: "unset"
                                                        }}>
                                                            Details of Complaint
                                                        </div>
                                                    </div>
                                                    <div className="card-body"
                                                         style={{backgroundColor: "rgba(00,00,00, 0.04)"}}>
                                                        <Row>
                                                            <Col xs={12} md={5}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Victim Name:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.victimName}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12} md={2}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Age:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm col-md-4 text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.victimAge}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12} md={4}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Gender:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm col-md-4 text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.victimGender}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Offense Type:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.offenseType}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Statement:
                                                                            </span>
                                                                        </div>
                                                                        <textarea
                                                                            className="form-control text-black"
                                                                            rows={3}
                                                                            style={{
                                                                                border: "1px solid #dee2e6",
                                                                                borderLeft: "none",
                                                                                borderRadius: "0 .25rem .25rem .25rem",
                                                                                fontSize: "1rem",
                                                                                height: "6rem"
                                                                            }}
                                                                            defaultValue={this.state.viewComplaint.statement}
                                                                            readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={12}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text" style={{
                                                                                height: "2.03rem",
                                                                                marginBottom: ".2rem"
                                                                            }}>
                                                                                Crime Location:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-2 mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.cRegion + ` Region`}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-auto mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.cDist + ` District`}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-auto mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.cCounty + ` County`}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-3 mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.cCounty}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black col-md-auto mr-2"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.cVillage}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={8}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Damage / Injury:
                                                                            </span>
                                                                        </div>
                                                                        <textarea
                                                                            className="form-control text-black"
                                                                            rows={3}
                                                                            style={{
                                                                                border: "1px solid #dee2e6",
                                                                                borderLeft: "none",
                                                                                borderRadius: "0 .25rem .25rem .25rem",
                                                                                fontSize: "1rem",
                                                                                height: "6rem"
                                                                            }}
                                                                            defaultValue={this.state.viewComplaint.dIDescription}
                                                                            readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span
                                                                                className="input-group-text mr-md-3 mr-1 mb-1"
                                                                                style={{
                                                                                    height: "2.03rem",
                                                                                    borderRight: "1px solid #dee2e6"
                                                                                }}>
                                                                                Witness Data:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm mr-md-3 mr-1 text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderRadius: "0.25rem",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.witnessName}
                                                                               readOnly={true}/>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderRadius: ".25rem",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.witnessContact}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={8}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Medical Examination:
                                                                            </span>
                                                                        </div>
                                                                        <textarea
                                                                            className="form-control text-black"
                                                                            rows={3}
                                                                            style={{
                                                                                border: "1px solid #dee2e6",
                                                                                borderLeft: "none",
                                                                                borderRadius: "0 .25rem .25rem .25rem",
                                                                                fontSize: "1rem",
                                                                                height: "6rem"
                                                                            }}
                                                                            defaultValue={this.state.viewComplaint.medExamRef}
                                                                            readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Offense Reported:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.reportRef}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" style={{padding: ".7rem"}}>
                                                        <div className="card-title"
                                                             style={{marginBottom: "unset"}}>Officer Complained Against
                                                        </div>
                                                    </div>
                                                    <div className="card-body"
                                                         style={{backgroundColor: "rgba(00,00,00,0.04)"}}>
                                                        <Row>
                                                            <Col xs={12} md={6}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Offending Officer Name:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.officerName}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Offending Officer Rank:
                                                                            </span>
                                                                        </div>
                                                                        <input type="text"
                                                                               className="form-control-sm text-black"
                                                                               style={{
                                                                                   border: "1px solid #dee2e6",
                                                                                   borderLeft: "none",
                                                                                   borderRadius: "0 .25rem .25rem 0",
                                                                                   fontSize: "1rem"
                                                                               }}
                                                                               defaultValue={this.state.viewComplaint.officerRank}
                                                                               readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={8}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Officer Description:
                                                                            </span>
                                                                        </div>
                                                                        <textarea
                                                                            className="form-control text-black"
                                                                            rows={3}
                                                                            style={{
                                                                                border: "1px solid #dee2e6",
                                                                                borderLeft: "none",
                                                                                borderRadius: "0 .25rem .25rem .25rem",
                                                                                fontSize: "1rem",
                                                                                height: "6rem"
                                                                            }}
                                                                            defaultValue={this.state.viewComplaint.otherId}
                                                                            readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} md={8}>
                                                                <div className="form-group"
                                                                     style={{marginBottom: ".8rem"}}>
                                                                    <div className="input-group input-group-sm">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"
                                                                                  style={{height: "2.01rem"}}>
                                                                                Officer Attached unit:
                                                                            </span>
                                                                        </div>
                                                                        <textarea
                                                                            className="form-control text-black"
                                                                            rows={3}
                                                                            style={{
                                                                                border: "1px solid #dee2e6",
                                                                                borderLeft: "none",
                                                                                borderRadius: "0 .25rem .25rem .25rem",
                                                                                fontSize: "1rem",
                                                                                height: "6rem"
                                                                            }}
                                                                            defaultValue={this.state.viewComplaint.detUnit}
                                                                            readOnly={true}/>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </>
                                            : <></>
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button id="finCopy" type="button" className="btn btn-success"
                                            data-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Tables
