import React, {Component} from "react";
import Select from 'react-select'

class DropDownInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    render() {
        return (
            <>
                <div className={`form-group ` + this.props.class}>
                    <label htmlFor={this.props.field}>{this.props.label}:<sup
                        className='text-red'>{this.props.required ? '*' : ''}</sup></label>
                    <Select
                        className={`basic-single `}
                        classNamePrefix={'select'}
                        isDisabled={this.props.disabled}
                        isLoading={this.props.loading}
                        isClearable={this.props.clearable}
                        isRtl={false}
                        isSearchable={true}
                        name={this.props.name}
                        options={this.props.options}
                        onChange={this.props.onChange}
                        id={this.props.field}
                        isOptionDisabled={opt => opt.disabled}
                        getOptionLabel={opt => opt.label}
                        getOptionValue={opt => opt.value}
                        data-row={this.props.dataRow}
                    />
                    {
                        this.props.error === true ?
                            <>
                                <div className="text-left text-danger">Required.</div>
                            </>
                            : <></>
                    }
                </div>
            </>
        );
    }
}

export default DropDownInput
