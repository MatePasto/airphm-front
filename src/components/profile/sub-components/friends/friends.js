import '../../profile.css'
import { Avatar, Box, Card, Grid, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'
import { authService } from '../../../../services/auth.service'

export default function Friends() {
    const [user, setUser] = useState({})
    const [data, setData] = useState([])

    const userLogged = async () => {
        const logged = sessionStorage.getItem('logged')
        const access = await authService.getByUsername(logged)
        setData(access.friends)
        setUser(access)
    }

    const deleteFriend = (friendId) => {
        const newArr = user.friends.filter(item => item.id !== friendId)
        user.friends = newArr
        console.log(user.friends, newArr)
    }

    const updateUser = async () => {
        await authService.setUserData(user.id, user)
    }

    useEffect(() => {
        userLogged()
    }, [])

    useEffect(() => {
        updateUser()
    }, [deleteFriend])

    return (
        <div className='page-conteiner'>
            <Grid container spacing={1}>
                {data.map((item) =>
                    <Card
                        className='grid-item'
                        sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: 65, width: 250}}
                    >
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Avatar />
                            <Box sx={{display: 'flex', flexDirection: 'column', paddingLeft: '1rem'}}>
                                <Typography>{item.name} {item.surname}</Typography>
                                <Typography sx={{color: 'grey'}}>{item.countryOfResidence}</Typography>
                            </Box>
                        </Box>
                        <IconButton
                            color='error'
                            onClick={deleteFriend(item.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        </Card>
                )}
            </Grid>
        </div>
    )
}
