import React, {Component} from "react";
import Datepicker from "../DateTimePickerComp";

const script = document.createElement('script');

class DateTimePicker extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const id = this.props.id;
        // script.innerText += '$(#'+id+').datetimepicker();\n'
        // document.body.appendChild(script)
    }

    componentWillUnmount() {
        // document.body.removeChild(script)
    }

    render() {
        let inV = null
        if(this.props.initVal !== null) {
            inV = new Date(2000, 0, 1)
        } else {
            inV = new Date()
        }
        return (
            <>
                <div className={this.props.class}>
                    <label htmlFor={this.props.field}>{this.props.label}:<sup
                        className='text-red'>{this.props.required ? '*' : ''}</sup></label>
                    <Datepicker
                        inputProps={{
                            placeholder: "Pick Date here",
                            name: this.props.field,
                        }}
                        initial={inV}
                        onChange={this.props.onchange}
                    />
                    {
                        this.props.error === true ?
                            <>
                                <div className="text-left text-danger m--2">Required.</div>
                            </>
                            : <></>
                    }
                </div>
            </>
        );
    }
}

export default DateTimePicker
