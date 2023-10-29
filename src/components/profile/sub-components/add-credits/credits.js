import { authService } from "../../../../services/auth.service"
import { Button, Dialog, DialogContent, DialogContentText, Input, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"

export default function Credits() {
    const [user, setUser] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [credits, setCredits] = useState(0)

    const updateUser = async () => {
        await authService.setUserData(user.id, user)
    }

    const handleClickOpen = () => {
        setCredits(0)
        setOpenDialog(true)
    }

    const handleClickClose = async () => {
        const newBalance = Number(user.balance) + Math.max(0, Number(credits))
        setUser({...user, balance: newBalance})
        setOpenDialog(false)
    }

    const userLogged = async () => {
        const logged = sessionStorage.getItem('logged')
        const access = await authService.getByUsername(logged)
        setUser(access)
    }

    useEffect(() => {
        userLogged()
    }, [])

    useEffect(() => {
        updateUser()
    }, [handleClickClose])

    return (
        <>
            <Typography className='profile-item'>Creditos: $ {user.balance}</Typography>
            <Button
                className='profile-item primary-color'
                variant='contained'
                onClick={handleClickOpen}
            >
                Agregar Creditos
            </Button>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogContentText>
                        Agregar Creditos
                    </DialogContentText>
                    <Input
                        type='number'
                        placeholder='Creditos'
                        sx={{width: 250, height: 40}}
                        onChange={((event) => setCredits(event.target.value))}
                    />
                </DialogContent>
                <Button
                    className='profile-item primary-color'
                    variant='contained'
                    onClick={handleClickClose}
                >
                    Agregar Creditos
                </Button>
            </Dialog>
        </>
    )
}
