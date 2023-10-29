import { Avatar, Box, Card, IconButton, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import StarIcon from '@mui/icons-material/Star'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CommentaryCard( {rate} ) {
    return (
        <Card
            className='grid-item'
            sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: 100, width: 400}}
        >
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Avatar />
                    <Box sx={{display: 'flex', flexDirection: 'column', paddingLeft: '1rem'}}>
                        <Typography>{rate.userRate.name} {rate.userRate.surname}</Typography>
                        <Typography sx={{color: 'grey'}}>{rate.userRate.countr}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <StarIcon /> 
                    <Typography>{rate.rateScore}</Typography>
                    <IconButton color='error'>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
            <Typography className='overflow' sx={{color: 'grey'}}>
                {rate.commentary}
            </Typography>
        </Card>
    )
}

CommentaryCard.propTypes = {
    rate: PropTypes.any.isRequired
}
