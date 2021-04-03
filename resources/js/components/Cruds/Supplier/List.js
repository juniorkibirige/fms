import React, {Component} from 'react'
import axios from 'axios'

// import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'

import {Col, Row} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import Select from "react-select";

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        alert(`clicked on ${row} with index: ${rowIndex}`)
    }
}

const {SearchBar} = Search;

class SupplierList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suppliers: [],
            alert: null
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        document.title += " : Suppliers"
        this.actionButtons = this.actionButtons.bind(this)
        // this.handleActionButtons = this.handleActionButtons.bind(this)
    }

    handleActionButtons(row) {
        console.log(row)
        console.log(event.target)
    }

    actionButtons(cell, row) {
        let options = [
            {
                value: 'view',
                label: 'View'
            },
            {
                value: 'edit',
                label: 'Edit'
            },
            {
                value: 'del',
                label: 'Delete'
            },
        ]
        return (
            <>
                <Select
                    className={`basic-single `}
                    classNamePrefix={'select'}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={false}
                    name={this.props.name}
                    defaultValue={options[0]}
                    options={options}
                    onChange={this.handleActionButtons.bind(this, row)}
                    // id={this.props.field}
                    isOptionDisabled={opt => opt.disabled}
                    getOptionLabel={opt => opt.label}
                    getOptionValue={opt => opt.value}
                    data-row={this.props.dataRow}
                />
            </>
        )
    }

    handleFieldChange() {
        let data = event.target.value
        this.setState({
            newCat: data
        })
    }

    componentDidMount() {
        axios.get('/api/supplier').then(response => {
            this.setState({
                suppliers: response.data.suppliers,
            });
        });
    }


    render() {
        return (
            <>
                {this.state.alert}
                <div className='header' style={{minHeight: `100%`}}>
                    <div className='container-fluid pt-4 pb-2'>
                        <span className="text-2xl text-capitalize">Suppliers</span>
                    </div>
                </div>
                <div className="col-md-12 bg-blue-gray-400">
                    <Row className='align-items-center py-4'>
                        <Col>
                            <ToolkitProvider
                                data={this.state.suppliers}
                                keyField="id"
                                columns={[
                                    {
                                        dataField: 'id',
                                        text: 'ID',
                                        hidden: false,
                                        classes: 'col-1'
                                    },
                                    {
                                        dataField: 'name',
                                        text: 'Name',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3',
                                        sort: true,
                                        filter: textFilter(),
                                    },
                                    {
                                        dataField: 'phone',
                                        text: 'Phone No.',
                                        hidden: false,
                                        classes: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                        headerClasses: 'col-md-2 col-sm-3 d-md-table-cell d-sm-table-cell d-none',
                                    },
                                    {
                                        dataField: 'region',
                                        text: 'Region',
                                        hidden: false,
                                        classes: 'col-md-2 d-md-table-cell d-none',
                                        headerClasses: 'col-md-2 d-md-table-cell d-none',
                                        filter: textFilter(),
                                    },
                                    {
                                        dataField: 'district',
                                        text: 'District',
                                        hidden: false,
                                        classes: 'col-md-2 d-md-table-cell d-none',
                                        headerClasses: 'col-md-2 d-md-table-cell d-none',
                                        filter: textFilter(),
                                    },
                                    {
                                        dataField: 'actions',
                                        isDummyField: true,
                                        classes: 'col-md-2 col-sm-2',
                                        headerClasses: 'col-md-2 col-sm-2',
                                        text: '',
                                        hidden: false,
                                        formatter: this.actionButtons
                                    },
                                ]}
                                hover
                                // search
                            >
                                {
                                    props => (
                                        <>
                                            <Row>
                                                <Col sm={6} xs={'xs-d-none'}/>
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
                                            <BootstrapTable
                                                ref={el => (this.componentRef = el)}
                                                {...props.baseProps}
                                                classes={`table-white`}
                                                bootstrap4={true}
                                                bordered={true}
                                                filter={ filterFactory() }
                                                filterPosition={'top'}
                                                pagination={paginationFactory({
                                                    showTotal: true,
                                                    sizePerPageList: [{
                                                        text: '5', value: 5
                                                    }, {
                                                        text: '10', value: 10
                                                    }, {
                                                        text: '20', value: 20,
                                                    }, {
                                                        text: '50', value: 50,
                                                    }, {
                                                        text: '100', value: 100,
                                                    }]
                                                })}
                                                noDataIndication={"No Suppliers"}
                                                id="react-supplier-table"
                                            />
                                        </>
                                    )
                                }
                            </ToolkitProvider>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default SupplierList
