import './profile.css'
import { Avatar, Box, Button, DialogContentText, Input, Link, MenuItem, Select, Typography } from "@mui/material"
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { authService } from '../../services/auth.service'
import Credits from './sub-components/add-credits/credits'

export default function Profile() {
    const [user, setUser] = useState({})

    const userLogged = async () => {
        const logged = sessionStorage.getItem('logged')
        const access = await authService.getByUsername(logged)
        setUser(access)
    }

    const updateUser = async () => {
        await authService.setUserData(user.id, user)
    }

    const navigate = useNavigate()

    const handleLogOut = () => {
        authService.logOutUser();
        navigate('/home')
    }

    const handleInputChange = (event) => {
        setUser({
            ...user,
            birthDate: event.target.value
        })
    }

    const handleSelectChange = (event) => {
        setUser({
            ...user,
            countryOfResidence: event.target.value
        })
    }

    const options = [
        { value: 'Argentina', label: 'Argentina' },
        { value: 'Uruguay', label: 'Uruguay' },
        { value: 'Brazil', label: 'Brazil' },
        { value: 'Estados Unidos', label: 'Estados Unidos' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Islandia', label: 'Islandia' },
        { value: 'Italia', label: 'Italia' },
        { value: 'España', label: 'España' },
        { value: 'Japon', label: 'Japon' }
    ]
    
    useEffect(() => {
        userLogged()
    }, [])

    useEffect(() => {
        updateUser()
    }, [handleInputChange, handleSelectChange])

    return (
        <div className='page'>
            <Box
                className='profile-details'
                sx={{width: 1/3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'}}
            >
                <Avatar className='profile-item' sx={{height: 256, width: 256}}/>
                <Typography className='profile-item'>{user.name} {user.surname}</Typography>
                <DialogContentText className='profile-item'>Fecha de Nacimiento
                    <Input
                        name='birthDateInput'
                        type='date'
                        placeholder='dd/mm/aaaa'
                        value={user.birthDate}
                        sx={{width: 250, height: 40}}
                        onChange={handleInputChange}
                    />
                </DialogContentText>
                <Typography className='profile-item'>Edad: {user.userAge}</Typography>
                <DialogContentText className='profile-item'>Pais
                    <Select
                        name='country'
                        sx={{width: 250, height: 40}}
                        value={user.countryOfResidence || ''}
                        onChange={handleSelectChange}
                    >
                        {options.map((item, index) => 
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        )}
                    </Select>

                </DialogContentText>
                <Credits />
                <Button
                    className='profile-item primary-color'
                    variant='contained'
                    // onClick={handleLogOut()}
                    >
                        Cerrar Sesion
                    </Button>
            </Box>
            <div className='sub-page'>
                <Box
                    className='navigation-bar'
                    sx={{width: 1, height: 50, borderBottom: '2px solid black'}}
                >
                    <nav className='nav-wrapper'>
                        <Link className='profile-link' color='inherit' underline='none' href='/profile/reserves'>Reservas Compradas</Link>
                        <Link className='profile-link' color='inherit' underline='none' href='/profile/friends'>Amigos</Link>
                        <Link className='profile-link' color='inherit' underline='none' href='/profile/comentaries'>Comentarios</Link>
                        <Link className='profile-link' color='inherit' underline='none' href='/profile/publications'>Mis Publicaciones</Link>
                    </nav>
                </Box>
                <Outlet /> 
            </div>
        </div>
    )
}
