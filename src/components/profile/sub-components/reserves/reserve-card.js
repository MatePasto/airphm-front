import StarIcon from '@mui/icons-material/Star'
import assetImg from '../../../assets/img-asset-1.jpg'
import PropTypes from 'prop-types'
import { Box, Button, Card, Dialog, DialogContent, DialogContentText, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { authService } from "../../../../services/auth.service"
import { User } from "../../../../domain/user/user"
import { Lodgment } from "../../../../domain/Lodgment"

export default function ReserveCrad( {reserve} ) {
    const [user, setUser] = useState(new User())
    const [lodgment, setLodgment] = useState(new Lodgment())
    const [openDialog, setOpenDialog] = useState(false)

    const userLogged = async () => {
        const logged = sessionStorage.getItem('logged')
        const access = await authService.getByUsername(logged)
        setUser(access)
    }

    const getReserve = async () => {
        const ldg = reserve.lodgment
        setLodgment(ldg)
    }

    const averageScore = () => {
        const sum = lodgment.rate.map(item => item.rateScore)
        const average = sum.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        },0)
        return average / Math.max(1, sum.length)
    }

    const totalCost = () => {
        const dayDifference = new Date(reserve.endDate) - new Date(reserve.startDate)
        return reserve.cost * ((dayDifference) / (1000 * 60 * 60 * 24))
    }

    const handleClickOpen = () => {
        const rated = lodgment.rate.find(data => data.userRate.id == user.id)
        if(rated === null) {
            setOpenDialog(true)
        }
    }

    const rateLodgment = () => {
        setOpenDialog(false)
    }

    useEffect( () => {
        getReserve()
        userLogged()
    }, [])

    return (
        <Card
            className='grid-item'
            sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: 250, width: 400}}
        >
            <img
                alt='acomodation'
                src={assetImg}
                height={140}
            />
            <Box
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
            >
                <Typography>
                    {lodgment.name}
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <StarIcon/>
                    <Typography >{averageScore()}</Typography>
                    <Typography>({lodgment.rate.lenght})</Typography>
                </Box>
            </Box>
            <Typography className='overflow' sx={{color: 'grey'}}>
                {lodgment.description}
            </Typography>
            <Box
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0.25rem'}}
            >
                <Typography sx={{fontWeight: 'bold'}}>
                    Ubicacion: {lodgment.address} - {lodgment.country}
                </Typography>
                <Button className='primary-color' variant='contained' size='small' onClick={handleClickOpen}>Calificar</Button>
                <Dialog open={openDialog}>
                    <DialogContentText sx={{display: 'flex', justifyContent: 'center', padding: '0.5rem'}}>
                        Calificar alojamiento reservado
                    </DialogContentText>
                    <DialogContent>
                        <StarIcon className='rating-star' onClick={rateLodgment}/>
                        <StarIcon className='rating-star' onClick={rateLodgment}/>
                        <StarIcon className='rating-star' onClick={rateLodgment}/>
                        <StarIcon className='rating-star' onClick={rateLodgment}/>
                        <StarIcon className='rating-star' onClick={rateLodgment}/>
                    </DialogContent>
                </Dialog>
            </Box>
            <Box
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}
            >
                <Typography sx={{fontWeight: 'bold'}}>
                    Costo por dia: $ {reserve.cost}
                </Typography>
                <Typography sx={{fontWeight: 'bold'}}>
                    Costo por total: $ {totalCost()}
                </Typography>
            </Box>
        </Card>
    )
}

ReserveCrad.propTypes = {
    reserve: PropTypes.any.isRequired
}
