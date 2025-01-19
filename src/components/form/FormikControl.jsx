import Switch from "../authForm/Switch"
import File from "./File"
import Inputt from "./Input"
import Select from "./Select"
import Textarea from "./Textarea"


const FormikControl = (props) => {
    switch (props.control) {
        case 'select':
            return <Select {...props}/>
        case 'input':
            return <Inputt {...props}/>
        case 'textarea':
            return <Textarea {...props}/>
        case 'file':
            return <File {...props}/>
        case 'switch':
            return <Switch {...props}/>
        default:
            return null
    }
}

export default FormikControl;