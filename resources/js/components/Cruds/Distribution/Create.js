import React, {Component} from 'react'
import TextInput from "../../Fields/TextInput";
import DropDownInput from "../../Fields/DropDownInput";
import DateTimePicker from "../../Fields/DateTimePicker";
import QuantityInput from "../../Fields/QuantityInput";
import RateInput from "../../Fields/RateInput";
import TotalInput from "../../Fields/TotalInput";
import axios from "axios";

const realFields = [
    'season', 'distributed_on',
    'status', 'office_id',
    'beneficiary_id', 'inputs',
    'delivered_by'
]

class DistributionCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            loadingDs: false,
            loadingRs: true,
            loadingCs: false,
            loadingPs: false,
            districts: [],
            offices: [],
            regions: [],
            counties: [],
            parishes: [],
            submitting: false,
            beneficiaries: [],
            statuses: [
                {
                    value: 'pending',
                    label: 'Pending'
                },
                {
                    value: 'running',
                    label: 'Running'
                },
                {
                    value: 'terminated',
                    label: 'Terminated'
                },
            ],
            distributed_on: new Date(),
            errors: {},
            is: [],
            inputs: [],
            alert: null,
        }
        document.title = document.title.split(':')[0] + " : Distribute"
        this.handleRepeatableFieldChange = this.handleRepeatableFieldChange.bind(this)
        this.handleOfficeFieldChange = this.handleOfficeFieldChange.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleQuantityFieldChange = this.handleQuantityFieldChange.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.handleAddNew = this.handleAddNew.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getInputs = this.getInputs.bind(this)
        this.getOffices = this.getOffices.bind(this)
        this.getBeneficiaries = this.getBeneficiaries.bind(this)
    }

    getDistricts(re) {
        let dis = []
        let k = 0
        if (re !== '') {
            this.setState({
                loadingDs: true,
            });
            axios.get('/api/districts/' + re).then(res => {
                res.data.map((v, k) => {
                    let d = {}
                    d['value'] = v.id
                    d['label'] = v.name.concat(' District')
                    dis.push(d)
                });
                this.setState({
                    districts: dis,
                    loadingDs: false
                })
            });
        }
    }

    getCounties(re, di) {
        let dis = []
        let k = 0
        if (re !== '' && di !== '') {
            this.setState({
                loadingCs: true,
            });
            axios.get('/api/counties/' + re + '/' + di).then(res => {
                res.data.map((v, k) => {
                    let d = {}
                    d['value'] = v.id
                    d['label'] = v.name.concat(' County')
                    dis.push(d)
                });
                this.setState({
                    counties: dis,
                    loadingCs: false
                })
            });
        }
    }

    getParish(re, di, co) {
        let dis = []
        let k = 0
        if (re !== '' && di !== '' && co !== '') {
            this.setState({
                loadingPs: true,
            });
            axios.get('/api/parishes/' + re + '/' + di + '/' + co).then(res => {
                res.data.map((v, k) => {
                    let d = {}
                    d['value'] = v.id
                    d['label'] = v.name.concat(' Parish')
                    dis.push(d)
                });
                this.setState({
                    parishes: dis,
                    loadingPs: false
                })
            });
        }
    }

    getRegions() {
        let reg = []
        let k = 0
        axios.get('/api/regions').then(res => {
            res.data.map((v, k) => {
                let r = {}
                r['value'] = v.id
                r['label'] = v.name.concat(' Region')
                reg.push(r)
            });
        });
        this.setState({
            regions: reg,
            loadingRs: false,
        })
    }

    getRepeatableValue(row, field) {
        let vs = this.state.inputs
        return vs[row][field]
    }

    handleRepeatableFieldChange(elem) {
        let element = event.target.parentElement.parentElement.parentElement
        if (element.className.includes('select__indicators css-1hb7zxy-IndicatorsContainer'))
            element = element.parentElement.parentElement
        let data = null
        if (elem !== null) {
            data = elem.value
        } else {
            data = null
        }
        let vs = this.state.inputs
        let ids = element.id.split('_')
        let name
        if (ids.length === 2)
            name = ids[1]
        else if (ids.length > 2) {
            ids.splice(0, 1)
            name = ids.join('_')
        }
        let row = parseInt(element.id.split('_')[0])
        vs[row][name] = data
        this.setState({
            inputs: vs
        })
    }

    handleOfficeFieldChange(elem) {
        let elemt = event.target.parentElement.parentElement.parentElement
        if (elemt.className.includes('select__indicators css-1hb7zxy-IndicatorsContainer'))
            elemt = elemt.parentElement.parentElement
        let data
        if (elem === null) {
            data = null
        } else
            data = elem.value
        let name = elemt.id
        this.setState(prevState => ({
            [name]: data,
            errors: {
                ...prevState.errors,
                [name]: false
            }
        }))
    }

    handleQuantityFieldChange() {
        let data = event.target.value
        let row = parseInt(event.target.dataset['row'])
        let vs = this.state.inputs
        let d = data.split('')
        if (parseInt(d[0]) === 0) {
            d.shift()
            if (d.length !== 0)
                data = d.join('')
            else data = '0'
        }
        vs[row]['quantity'] = parseInt(data)
        this.setState({
            inputs: vs,
        })
    }

    handleFieldChange() {
        let data = event.target.value
        if (event.target.id.includes('react-select')) {
            data = event.target.textContent
            let isR = false, isD = false, isC = false
            for (const regionsKey in this.state.regions) {
                if (this.state.regions.hasOwnProperty(regionsKey))
                    if (this.state.regions[regionsKey].label === data) {
                        data = this.state.regions[regionsKey].value
                        isR = true;
                        break;
                    }
            }
            if (!isR) {
                for (const districtsKey in this.state.districts) {
                    if (this.state.districts.hasOwnProperty(districtsKey))
                        if (this.state.districts[districtsKey].label === data) {
                            data = this.state.districts[districtsKey].value
                            isD = true;
                            break;
                        }
                }
            }
            if (!isR && !isD) {
                for (const countyKey in this.state.counties) {
                    if (this.state.counties.hasOwnProperty(countyKey))
                        if (this.state.counties[countyKey].label === data) {
                            data = this.state.counties[countyKey].value
                            isC = true;
                            break;
                        }
                }
            }
            if (!isR && !isD && !isC) {
                for (const parishKey in this.state.parishes) {
                    if (this.state.parishes.hasOwnProperty(parishKey))
                        if (this.state.parishes[parishKey].label === data) {
                            data = this.state.parishes[parishKey].value
                            break;
                        }
                }
            }
            if (isR) {
                this.setState(prevState => ({
                    cR: data,
                    errors: {
                        ...prevState.errors,
                        cR: false,
                    }
                }))
                this.getDistricts(data)
            } else if (isD) {
                this.setState(prevState => ({
                    cD: data,
                    errors: {
                        ...prevState.errors,
                        cD: false,
                    }
                }))
                this.getCounties(this.state.cR, data)
            } else if (isC) {
                this.setState(prevState => ({
                    cC: data,
                    errors: {
                        ...prevState.errors,
                        cC: false,
                    }
                }))
                this.getParish(this.state.cR, this.state.cD, data)
            } else {
                this.setState(prevState => ({
                    cP: data,
                    errors: {
                        ...prevState.errors,
                        cP: false,
                    }
                }))
            }
        } else if (event.target.className.includes('rdtDay')) {
            const day = event.target.dataset['value']
            const month = event.target.dataset['month']
            const year = event.target.dataset['year']
            let d = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].name
            data = (parseInt(month) + 1).toString().concat('/').concat(day).concat('/').concat(year)
            this.setState(prevState => ({
                [d]: data,
                errors: {
                    ...prevState.errors,
                    [d]: false,
                }
            }))
        } else
            this.setState(prevState => ({
                [event.target.name]: data,
                errors: {
                    ...prevState.errors,
                    [event.target.name]: false,
                }
            }))
    }

    handleAddNew() {
        let a = {
            input_id: 0,
            quantity: 0,
        }
        let inps = this.state.inputs
        inps.push(a)
        this.setState(prevState => ({
            inputs: inps,
            errors: {
                ...prevState.errors,
                inputs: false,
            }
        }))
    }

    deleteItem() {
        let i = event.target.dataset['row']
        let vs = this.state.inputs
        let nw = []
        vs.map((v, k) => {
            if (k !== parseInt(i)) {
                nw.push(v)
            }
        })
        this.setState({
            inputs: nw
        })
    }

    async handleSubmit() {
        let nonFields = [
            'submitting',
            'suppliers',
            'cData',
            'districts',
            'offices',
            'is',
            'regions',
            'counties',
            'parishes',
            'statuses',
            'alert',
            'loadingRs', 'loadingDs',
            'loadingCs', 'loadingPs',
            'errors',
        ]
        let fields = []
        let errors = []
        realFields.map((v) => {
            errors.push(v)
        })
        Object.keys(this.state).map((v, k) => {
            if (!nonFields.includes(v)) {
                for (let i = 0; i < errors.length; i++) {
                    let err = errors[i]
                    if (err === v) {
                        errors.splice(i, 1)
                    }
                }
                if (v === 'inputs') {
                    if (this.state.inputs.length !== 0)
                        fields[v] = Object.values(this.state)[k]
                    else {
                        errors.push('inputs')
                    }
                } else
                    fields[v] = Object.values(this.state)[k]
            }
        });
        if (fields.length <= 0 && errors.length > 0) {
            let stateErrors = {}
            for (const errorsKey in errors) {
                if (errors.hasOwnProperty(errorsKey)) {
                    let err = errors[errorsKey]
                    stateErrors[err] = true
                }
            }
            this.setState({
                errors: stateErrors
            })
        } else {
            this.setState({
                submitting: true
            })
            const form = {
                'distribution_data': {
                    'season': this.state.season,
                    'distributed_on': this.state.distributed_on,
                    'status': this.state.status,
                    'office_id': this.state.office_id,
                    'beneficiary_id': this.state.beneficiary_id,
                    'delivered_by': this.state.delivered_by,
                },
                'inputs': {
                    'inputs': this.state.inputs
                },
            }

            await axios.post('/api/distributions', form)
                .then(response => {
                    console.log(response)
                    // location.href = location.origin + '/dashboard/distribution/list'
                })
                .catch(error => {
                    // console.warn(error.response.data.errors)
                    // this.setState({
                    //     errors: error.response.data.errors
                    // })
                })
                .finally(() => {
                    this.setState({
                        submitting: false
                    })
                })
        }
    }

    getInputs() {
        let reg = []
        axios.get('/api/input').then(res => {
            res.data.inputs.map((v, k) => {
                let r = {}
                r['value'] = v.id
                r['label'] = v.name
                reg.push(r)
            });
        });
        this.setState({
            is: reg,
        })
    }

    getOffices() {
        let reg = []
        axios.get('/api/offices').then(res => {
            res.data.map((v, k) => {
                let r = {}
                r['value'] = v.id
                r['label'] = v.name
                reg.push(r)
            });
        });
        this.setState({
            offices: reg,
        })
    }

    getBeneficiaries() {
        let reg = []
        axios.get('/api/beneficiary').then(res => {
            res.data.beneficiaries.map((v, k) => {
                let r = {}
                r['value'] = v.id
                r['label'] = v.name
                reg.push(r)
            });
        });
        this.setState({
            beneficiaries: reg,
        })
    }

    componentDidMount() {
        let errs = {}
        realFields.map((v) => {
            errs[v] = false
        }, this)
        this.setState({
            errors: errs
        })
        this.getRegions()
        this.getInputs()
        this.getOffices()
        this.getBeneficiaries()
    }

    render() {
        return (
            <>
                <div className="h-full">
                    {this.state.alert}
                    <div className='header'>
                        <div className='container-fluid pt-4 pb-2'>
                            <span className="text-2xl text-capitalize">Distribution</span> <small>Distribute.</small><a
                            href="#"><i className="fa fa-angle-double-left"/> Back to Distribution Logs</a>
                        </div>
                    </div>
                    <div className="col-md-10 bg-blue-gray-400 pb-7">
                        <ul className="nav nav-tabs nav-justified mb-3" id="sCreate" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#dist-tab" className="nav-link active" id="dist"
                                   data-mdb-toggle="tab"
                                   role="tab" aria-controls="dist-tab" aria-selected="true">
                                    Distributions
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#inputs-tab" className="nav-link" id="inputs" data-mdb-toggle="tab"
                                   role="tab" aria-controls="inputs-tab" aria-selected="false">
                                    Inputs
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content bg-blue-gray-50 mt--3 p-4" id="sCreate-content">
                            <div className="tab-pane fade show active" id="dist-tab" role="tabpanel"
                                 aria-labelledby="dist">
                                <div className="container">
                                    <div className="row">
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Season'}
                                            required={true}
                                            field={'season'}
                                            placeholder={'Season'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.season}
                                            error={this.state.errors['season']}
                                        />
                                        <DateTimePicker
                                            class={'col-sm-6 required'}
                                            label={'Distributed On'}
                                            required={true}
                                            id={'distributed_on'}
                                            field={'distributed_on'}
                                            placeholder={'Distributed On'}
                                            onchange={this.handleFieldChange}
                                            value={this.state.distributed_on}
                                            initVal={new Date()}
                                            error={this.state.errors['distributed_on']}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Status'}
                                            required={true}
                                            field={'status'}
                                            onChange={this.handleOfficeFieldChange}
                                            value={this.state.status}
                                            clearable={true}
                                            options={this.state.statuses}
                                            error={this.state.errors['status']}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Office'}
                                            required={true}
                                            field={'office_id'}
                                            onChange={this.handleOfficeFieldChange}
                                            value={this.state.office_id}
                                            clearable={true}
                                            options={this.state.offices}
                                            error={this.state.errors['office_id']}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Beneficiary'}
                                            required={true}
                                            field={'beneficiary_id'}
                                            onChange={this.handleOfficeFieldChange}
                                            value={this.state.beneficiary_id}
                                            clearable={true}
                                            options={this.state.beneficiaries}
                                            error={this.state.errors['beneficiary_id']}
                                        />
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Delivered By'}
                                            required={true}
                                            field={'delivered_by'}
                                            placeholder={'Delivered By'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.delivered_by}
                                            error={this.state.errors['delivered_by']}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"tab-pane fade"} id="inputs-tab" role="tabpanel"
                                 aria-labelledby="inputs">
                                <div
                                    className={"container-repeatable-elements ".concat(this.state.errors['inputs'] ? "p-4 m--4 border border-danger" : "")}>
                                    <div data-repeatable-holder={'inputs'} data-init-rows={'1'}
                                         data-max-rows={0} data-min-rows={'1'}
                                         number-of-rows={this.state.inputs.length}>
                                        {
                                            this.state.inputs.map((input, index) => (
                                                <div key={index} data-content={input}
                                                     className="col-md-12 well repeatable-element row m-1 p-2"
                                                     data-repeatable-identifier={'inputs'}
                                                     data-row-number={index.toString()}>
                                                    <button
                                                        onClick={this.deleteItem}
                                                        data-row={index}
                                                        className={(this.state.inputs.length !== 1) ? "close delete-element" : 'close delete-element d-none'}
                                                        style={{paddingLeft: '0.285rem'}} type={'button'}>
                                                        <span aria-hidden="true" data-row={index}>
                                                            <i data-row={index} className="fa fa-times"/></span>
                                                    </button>
                                                    <DropDownInput
                                                        class={'col-12 mb--1 required'}
                                                        label={'Input'}
                                                        required={true}
                                                        field={index.toString() + '_input_id'}
                                                        name={'input_id'}
                                                        id={index.toString() + '_input'}
                                                        onChange={this.handleRepeatableFieldChange}
                                                        value={this.getRepeatableValue(index, 'input')}
                                                        clearable={true}
                                                        options={this.state.is}
                                                    />
                                                    <QuantityInput
                                                        class={'col-6 mb--1 required'}
                                                        label={'Quantity'}
                                                        required={true}
                                                        dataRow={index.toString()}
                                                        field={'quantity'}
                                                        onChange={this.handleQuantityFieldChange}
                                                        value={this.getRepeatableValue(index, 'quantity')}
                                                    />
                                                </div>
                                            ))
                                        }
                                        <button
                                            onClick={this.handleAddNew}
                                            className="btn btn-outline-primary btn-sm ml-1 add-repeatable-element-button"
                                            type="button"><i className="fa fa-plus"/> Add Item
                                        </button>
                                        <div className="row">
                                            <button
                                                className={"col-6 offset-3 block btn btn-lg ".concat(this.state.submitting ? 'btn-success' : 'btn-success')}
                                                aria-disabled={"true"}
                                                style={{
                                                    cursor: this.state.submitting ? 'wait' : 'pointer',
                                                    opacity: this.state.submitting ? '0.6' : '1'
                                                }}
                                                onClick={this.handleSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DistributionCreate
