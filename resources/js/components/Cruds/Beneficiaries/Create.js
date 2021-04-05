import React, {Component} from 'react'
import axios from 'axios'
import TextInput from "../../Fields/TextInput";
import DateTimePicker from "../../Fields/DateTimePicker";
import DropDownInput from "../../Fields/DropDownInput";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-solid-svg-icons'
import {Col, CustomInput, Row} from "reactstrap";
import {Redirect} from "react-router-dom";

const realFields = [
    'fName', 'mName', 'lName', 'cR', 'cD', 'cC',
    'cP', 'nin', 'gender', 'is_pwd',
    'type_of_disability', 'phone_number', 'dob',
    'office_id'
]

class BeneficiaryCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            errors: {},
            alert: null,
        }
        document.title = document.title.split(':')[0] + " : Supplier Create"
        this.handleRepeatableFieldChange = this.handleRepeatableFieldChange.bind(this)
        this.handleOfficeFieldChange = this.handleOfficeFieldChange.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleQuantityFieldChange = this.handleQuantityFieldChange.bind(this)
        this.handleRateFieldChange = this.handleRateFieldChange.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.handleAddNew = this.handleAddNew.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getOffices = this.getOffices.bind(this)
        this.image = this.image.bind(this)
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

    handleRateFieldChange() {
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
        vs[row]['rate'] = parseInt(data)
        if (!isNaN(data))
            vs[row]['total'] = parseInt(data) * vs[row]['quantity']
        else
            vs[row]['total'] = 0
        this.setState({
            inputs: vs
        })
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
        if (!isNaN(data))
            vs[row]['total'] = parseInt(data) * vs[row]['rate']
        else
            vs[row]['total'] = 0
        this.setState({
            inputs: vs,
        })
    }

    handleFieldChange() {
        let data = event.target.value
        if (event.target.id.includes('react-select')) {
            data = event.target.textContent
            let isR = false, isD = false, isC = false, isP = false
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
                            isP = true;
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
            } else if (isP) {
                this.setState(prevState => ({
                    cP: data,
                    errors: {
                        ...prevState.errors,
                        cP: false,
                    }
                }))
            } else {
                let element = event.target.parentElement.parentElement.parentElement
                if (element.className.includes('select__indicators css-1hb7zxy-IndicatorsContainer'))
                    element = element.parentElement.parentElement
                let data = null
                if (elem !== null) {
                    data = elem.value
                } else {
                    data = null
                }
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
        } else {
            if (event.target.type === 'checkbox')
                this.setState(prevState => ({
                    [event.target.name]: event.target.checked,
                    errors: {
                        ...prevState.errors,
                        [event.target.name]: false,
                    }
                }))
            else
                this.setState(prevState => ({
                    [event.target.name]: data,
                    errors: {
                        ...prevState.errors,
                        [event.target.name]: false,
                    }
                }))
        }
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
        let name = element.id
        this.setState({
            [name]: data
        })
    }

    componentDidMount() {
        let errs = {}
        let i = 0
        realFields.map((v) => {
            errs[v] = false
        }, this)
        this.setState({
            errors: errs
        })
        this.getRegions()
        this.getOffices()
    }

    handleAddNew() {
        let a = {
            input_id: 0,
            quantity: 0,
            rate: 0,
            total: 0,
            office_id: ''
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
            'errors'
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
                fields[v] = Object.values(this.state)[k]
            }
        });
        console.log(errors)
        console.log(fields)
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
            let form = new FormData()
            // const form = {
            form.append('name', this.state.fName + ' ' + this.state.mName + ' ' + this.state.lName,);
            form.append('NIN', this.state.nin)
            form.append('gender', this.state.gender)
            form.append('is_pwd', this.state.is_pwd)
            form.append('type_of_disability', this.state.type_of_disability,)
            form.append('phone_number', this.state.phone_number,)
            form.append('date_of_birth', this.state.dob,)
            form.append('region_id', this.state.cR,)
            form.append('district_id', this.state.cD,)
            form.append('county_id', this.state.cC,)
            form.append('parish_id', this.state.cP,)
            form.append('office_id', this.state.office_id)
            // }
            if (document.querySelector("#ben_dp").files[0] !== null)
                form.append('profile_pic', document.querySelector("#ben_dp").files[0], document.querySelector("#ben_dp").files[0].name)
            // console.log(form)

            await axios.post('/api/beneficiary', form)
                .then(response => {
                    // console.log(response)
                    location.href = location.origin + '/dashboard/beneficiaries/list'
                    // return (<Redirect to={'/dashboard/beneficiaries/list'}/>)
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

    image(event) {
        this.setState({
            dp: event
        })
    }

    render() {
        return (
            <>
                <div className="h-full">
                    {this.state.alert}
                    <div className='header'>
                        <div className='container-fluid pt-4 pb-2'>
                            <span className="text-2xl text-capitalize">Beneficiaries</span> <small>Add
                            Beneficiary.</small><a
                            href="/dashboard/beneficiaries/list"><i className="fa fa-angle-double-left"/> Back to all
                            Beneficiaries</a>
                        </div>
                    </div>
                    <div className="col-md-10 bg-blue-gray-400 pb-7">
                        <ul className="nav nav-tabs nav-justified mb-3" id="bCreate" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#ben_det_tab" className="nav-link active" id="ben_det"
                                   data-mdb-toggle="tab"
                                   role="tab"
                                   aria-controls="ben_det_tab" aria-selected="true"
                                >
                                    Beneficiary Details
                                </a>
                            </li>
                        </ul>
                        <div className="tabs-content bg-blue-gray-50 mt--3 p-4" id="bCreate-content">
                            <div className="tab-pane fade show active" id="ben_det_tab" role="tabpanel"
                                 aria-labelledby="ben_det">
                                <div className="container">
                                    <div className="row">
                                        <TextInput
                                            class={'col-sm-4 required'}
                                            label={'First Name'}
                                            required={true}
                                            field={'fName'}
                                            placeholder={'First Name'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.fName}
                                            error={this.state.errors['fName']}
                                        />
                                        <TextInput
                                            class={'col-sm-4 required'}
                                            label={'Middle Name'}
                                            required={true}
                                            field={'mName'}
                                            placeholder={'Middle Name'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.mName}
                                            error={this.state.errors['mName']}
                                        />
                                        <TextInput
                                            class={'col-sm-4 required'}
                                            label={'Last Name'}
                                            required={true}
                                            field={'lName'}
                                            placeholder={'Last Name'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.lName}
                                            error={this.state.errors['lName']}
                                        />
                                        <TextInput
                                            class={'offset-md-2 col-sm-7 required'}
                                            label={'NIN'}
                                            required={true}
                                            field={'nin'}
                                            placeholder={'NIN'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.nin}
                                            error={this.state.errors['nin']}
                                        />
                                        <DateTimePicker
                                            class={'col-sm-6 required'}
                                            label={'Date of Birth'}
                                            required={true}
                                            id={'dob'}
                                            field={'dob'}
                                            initVal={true}
                                            placeholder={'Date of Birth'}
                                            onchange={this.handleFieldChange}
                                            value={this.state.dob}
                                            error={this.state.errors['dob']}
                                        />
                                        <DropDownInput
                                            class={'col-sm-6 required'}
                                            label={'Gender'}
                                            required={true}
                                            field={'gender'}
                                            placeholder={'Gender'}
                                            onChange={this.handleRepeatableFieldChange}
                                            value={this.state.gender}
                                            error={this.state.errors['gender']}
                                            options={
                                                [
                                                    {
                                                        label: 'Male',
                                                        value: 'male'
                                                    },
                                                    {
                                                        label: 'Female',
                                                        value: 'female'
                                                    },
                                                    {
                                                        label: 'Prefer not to say',
                                                        value: 'other'
                                                    },
                                                ]
                                            }
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Regions'}
                                            required={true}
                                            field={'cR'}
                                            loading={this.state.loadingRs}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cR}
                                            clearable={true}
                                            options={this.state.regions}
                                            error={this.state.errors['cR']}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'District'}
                                            required={true}
                                            field={'cD'}
                                            loading={this.state.loadingDs}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cD}
                                            clearable={true}
                                            disabled={this.state.districts.length === 0}
                                            options={this.state.districts}
                                            error={this.state.errors['cD']}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'County'}
                                            required={true}
                                            field={'cC'}
                                            loading={this.state.loadingCs}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cC}
                                            clearable={true}
                                            disabled={this.state.counties.length === 0}
                                            options={this.state.counties}
                                            error={this.state.errors['cC']}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Parish'}
                                            required={true}
                                            field={'cP'}
                                            loading={this.state.loadingPs}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cP}
                                            clearable={true}
                                            disabled={this.state.parishes.length === 0}
                                            options={this.state.parishes}
                                            error={this.state.errors['cP']}
                                        />
                                        <TextInput
                                            class={'col-sm-6 required'}
                                            label={'Village/Cell'}
                                            required={true}
                                            field={'village'}
                                            placeholder={'village/Cell'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.village}
                                            error={this.state.errors['village']}
                                        />
                                        <TextInput
                                            class={'col-sm-6 required'}
                                            label={'Phone Number'}
                                            required={true}
                                            field={'phone_number'}
                                            placeholder={'+256xxxxxxxxx'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.phone_number}
                                            error={this.state.errors['phone_number']}
                                        />
                                        <CustomInput
                                            className={'col-sm-6 required'}
                                            label={'Person With Disability'}
                                            type={'checkbox'}
                                            id={'pwd'}
                                            inline={false}
                                            name={'is_pwd'}
                                            placeholder={'Person with Disability'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.is_pwd}
                                        />
                                        {
                                            this.state.errors['is_pwd'] === true ?
                                                <>
                                                    <span className="text-left text-danger">Required.</span>
                                                </>
                                                : <></>
                                        }
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Type Of Disability'}
                                            field={'type_of_disability'}
                                            onChange={this.handleRepeatableFieldChange}
                                            value={this.state.type_of_disability}
                                            clearable={true}
                                            options={[
                                                {
                                                    value: 'single',
                                                    label: 'Single'
                                                },
                                                {
                                                    value: 'married',
                                                    label: 'Married'
                                                },
                                                {
                                                    value: 'other',
                                                    label: 'Prefer not to say'
                                                },
                                            ]}
                                            error={this.state.is_pwd ? this.state.errors['type_of_disability'] : false}
                                        />
                                        <DropDownInput
                                            class={'col-md-10 required'}
                                            label={'Office'}
                                            required={true}
                                            field={'office_id'}
                                            onChange={this.handleOfficeFieldChange}
                                            value={this.state.office_id}
                                            clearable={true}
                                            options={this.state.offices}
                                            error={this.state.errors['office_id']}
                                        />
                                        <Col sm={12} md={12}>
                                            <ImageUploads onChange={this.image}/>
                                        </Col>
                                        <button
                                            className={"mt-3 col-6 offset-3 block btn btn-lg ".concat(this.state.submitting ? 'btn-success' : 'btn-success')}
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
            </>
        );
    }

    getInputs() {
        let reg = []
        axios.get('/api/input').then(res => {
            res.data.map((v, k) => {
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
}

class ImageUploads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            success: '',
            error: '',
            imagePreviewUrl: false
        }

        this.fileUpload = this.fileUpload.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        let files = event.target.files || event.dataTransfer.files
        if (!files.length) return
        this.props.onChange(files[0])
        this.createImage(files[0])
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: file,
                imagePreviewUrl: e.target.result
            })
        }
        reader.readAsDataURL(file)
    }

    fileUpload() {

    }

    render() {
        return (
            <>
                <Row>
                    <Col xs={12} md={6} sm={12} lg={6} xl={6}>
                        {
                            new images({
                                onChange: this.onChange
                            })
                        }
                    </Col>
                    <Col xs={12} md={6} sm={12} lg={6} xl={6}>
                        <div className="imgPreview">
                            {this.state.imagePreviewUrl ? (
                                <img className={`add_imagem`} name={`add_imagem`} width={200} height={150}
                                     src={this.state.imagePreviewUrl}/>) : ('')}
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}

const images = (props) => {
    return (
        <>
            <div className='buttons fadein'>
                <div className='button'>
                    <label htmlFor='ben_dp'>
                        <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x'/>
                    </label>
                    <input type='file' id='ben_dp' onChange={props.onChange} hidden={true}/>
                </div>
            </div>
        </>
    )
}

export default BeneficiaryCreate
