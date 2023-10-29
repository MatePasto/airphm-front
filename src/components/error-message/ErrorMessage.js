import { Stack } from '@mui/system';
import './ErrorMessage.css'
const ErrorMessage = ({message}) => {
    return <>
        <p className="error-font">
            {message}
        </p>
    </>
}

export default ErrorMessage