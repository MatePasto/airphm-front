import { Box, Card, Typography } from "@mui/material"
import StarIcon from '@mui/icons-material/Star'
import assetImg from '../../../assets/img-asset-1.jpg'
import PropTypes from 'prop-types'

export default function PublicationCard( {publication} ) {
    const averageScore = () => {
        const average = publication.lodgment.rate.map(item => item.rateScore)
        average.reduce((acc, cur) => acc + cur, 0)
        return average / average.length
    }

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
                <Typography >
                    {publication.lodgment.name}
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <StarIcon/> 
                    <Typography >{averageScore()}</Typography>
                    <Typography>({publication.lodgment.rate.length})</Typography> 
                </Box>
            </Box>
            <Typography sx={{color: 'grey'}}>
                {publication.lodgment.description}
            </Typography>
            <Box
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0.25rem'}}
            >
                <Typography sx={{fontWeight: 'bold'}}>
                    Ubicacion: {publication.lodgment.address} - {publication.lodgment.country}
                </Typography>
            </Box>
            <Box
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}
            >
                <Typography sx={{fontWeight: 'bold'}}>
                    Costo por dia: $ {publication.lodgment.baseCost}
                </Typography>
                <Typography sx={{fontWeight: 'bold'}}>
                    Costo por total: $ {publication.cost}
                </Typography>
            </Box>
        </Card>
    )
}

PublicationCard.propTypes = {
    publication: PropTypes.any.isRequired
}
