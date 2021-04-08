import React, {Component} from 'react'
import axios from 'axios'
import TextInput from "../../Fields/TextInput";
import DropDownInput from "../../Fields/DropDownInput";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-solid-svg-icons'
import {Col, Row} from "reactstrap";
import TextAreaInput from "../../Fields/TextAreaInput";

const realFields = [
    'name', 'type', 'description', 'extras',
    'office_id'
]

class InputsCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offices: [],
            submitting: false,
            errors: {},
            alert: null,
        }
        document.title = document.title.split(':')[0] + " : Input Create"
        this.handleRepeatableFieldChange = this.handleRepeatableFieldChange.bind(this)
        this.handleOfficeFieldChange = this.handleOfficeFieldChange.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getOffices = this.getOffices.bind(this)
        this.image = this.image.bind(this)
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

    handleFieldChange() {
        let data = event.target.value
        this.setState(prevState => ({
            [event.target.name]: data,
            errors: {
                ...prevState.errors,
                [event.target.name]: false,
            }
        }))
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
        this.getOffices()
    }

    async handleSubmit() {
        let nonFields = [
            'submitting',
            'offices',
            'alert',
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
            form.append('name', this.state.name)
            form.append('type', this.state.type)
            form.append('description', this.state.description)
            form.append('extras', this.state.extras)
            form.append('office_id', this.state.office_id,)
            // if (document.querySelector("#ben_dp").files[0] !== null)
            //     form.append('profile_pic', document.querySelector("#ben_dp").files[0], document.querySelector("#ben_dp").files[0].name)
            // console.log(form)

            // await axios.post('/api/input', form)
            //     .then(response => {
            //         // console.log(response)
            //         location.href = location.origin + '/dashboard/inputs/list'
            //         // return (<Redirect to={'/dashboard/beneficiaries/list'}/>)
            //     })
            //     .catch(error => {
            //         // console.warn(error.response.data.errors)
            //         // this.setState({
            //         //     errors: error.response.data.errors
            //         // })
            //     })
            //     .finally(() => {
            //         this.setState({
            //             submitting: false
            //         })
            //     })
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
                            <span className="text-2xl text-capitalize">Inputs</span> <small>Add
                            Input.</small><a
                            href="/dashboard/inputs/list"><i className="fa fa-angle-double-left"/> Back to all
                            Inputs</a>
                        </div>
                    </div>
                    <div className="col-md-10 bg-blue-gray-400 pb-7">
                        <div className="tabs-content bg-blue-gray-50 p-4" id="bCreate-content">
                            <div className="tab-pane fade show active" id="input_det_tab" role="tabpanel"
                                 aria-labelledby="input_det">
                                <div className="container">
                                    <div className="row">
                                        <TextInput
                                            class={'col-sm-8 required'}
                                            label={'Name'}
                                            required={true}
                                            field={'name'}
                                            placeholder={'Input Name'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.name}
                                            error={this.state.errors['n']}
                                        />
                                        <TextInput
                                            class={'col-sm-8 required'}
                                            label={'Type'}
                                            required={true}
                                            field={'type'}
                                            placeholder={'Type'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.type}
                                            error={this.state.errors['type']}
                                        />
                                        <TextAreaInput
                                            class={'col-sm-8 required'}
                                            label={'Description'}
                                            required={true}
                                            field={'description'}
                                            placeholder={'Description'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.description}
                                            error={this.state.errors['description']}
                                        />
                                        <TextAreaInput
                                            class={'col-sm-7 required'}
                                            label={'Extras'}
                                            required={true}
                                            field={'extras'}
                                            placeholder={'Any other data about the input ...'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.extras}
                                            error={this.state.errors['extras']}
                                        />
                                        <DropDownInput
                                            class={'col-sm-6 required'}
                                            label={'Office'}
                                            required={true}
                                            field={'office_id'}
                                            placeholder={'Office'}
                                            onChange={this.handleRepeatableFieldChange}
                                            value={this.state.office_id}
                                            error={this.state.errors['office_id']}
                                            options={this.state.offices}
                                        />
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

export default InputsCreate
