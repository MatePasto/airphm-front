import './Login.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import KeyIcon from '@mui/icons-material/Key'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Footer from '../../components/footer/Footer.js'
import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from "../../services/auth.service.js"
import { INTERNAL_SERVER_ERROR } from '../../services/util';

const Login = () => {
    const [data, setData] = useState({userName: "",password: ""})
    const [error, setError] = useState("")
    const [openAlert, setOpenAlert] = useState(true)
    
    function foundData(field){
        return field !== ''
    }

    const navigate = useNavigate()

    const userLogin = async () => {  
        try {
            await authService.logIn(data.userName, data.password)
            navigate('/home')
        } catch (error) {
            generarError(error)
            setOpenAlert(true)
        }
    }

    const generarError = (error) => {
        const status = error.response.status
        const mensajeError = status >= INTERNAL_SERVER_ERROR ? 'Ocurrió un error. Consulte al administrador del sistema' :
          (!status ? 'Ocurrió un error al conectarse al backend. Consulte al administrador del sistema' : error.response.data.message)
        if (status >= INTERNAL_SERVER_ERROR) {
            generarError(mensajeError)
            setOpenAlert(true)
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        setError("")
        if(foundData(data.userName) && foundData(data.password)){
            setData(data)
            userLogin()
        }
        else {
            setError("Debe ingresar Usuario y Contraseña")
            setOpenAlert(true)
        }
    }

    return (
        <>
        <form className="login-card main center-h" onSubmit={submitHandler}>
            <div className="login-card-header">
                <h3 className="login-card-title primary-color-title">Airphm</h3>
            </div>        
                <div className="login-input-container">
                    <AccountBoxIcon className="form-label" style={{fontSize: "3.5rem", color: "#FF385C"}}/>
                    <TextField id="outlined-basic" data-testid="username-input" label="Usuario" variant="outlined" sx={{borderColor: "#42a5f5", boxShadow: '1px 2px 4px grey', width: "85%"}}
                    onChange={e => { setData({...data,userName: e.target.value}) 
                                     setError("") }} value={data.userName}
                    type="userName" />
                </div>
            <div className="login-input-container">
                <KeyIcon style={{fontSize: "3.5rem", color: "#FF385C"}}/>
                <TextField type="password" data-testid="password-input" id="outlined-basic" label="Contraseña" variant="outlined" margin="dense" fullWidth sx={{borderColor: "#42a5f5", boxShadow: '1px 2px 4px grey', width: "85%"}}
                    onChange={e => { setData({...data,password: e.target.value})
                                     setError("") }} value={data.password}/>
            </div>
            <div className="login-btn-container">
                <Button className="login-btn primary-color" data-testid="submit" variant="contained" type="submit">Ingresar</Button>
            </div>
           { error!=="" ?
            <Collapse in={openAlert
}>
                <Alert data-testid="alert-message" severity="error" action={
                        <Button color="inherit" size="small" onClick={ () => { setOpenAlert(false) }}> X </Button>
                    }>{error}</Alert> </Collapse> : <></> }
        </form>

        <div><Footer /></div>
        
        </>
    )}

export default Login
