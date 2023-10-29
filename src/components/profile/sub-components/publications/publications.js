import PublicationCard from "./publication-card"
import AddIcon from "@mui/icons-material/Add"
import { authService } from "../../../../services/auth.service"
import { Fab, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Publications() {
    const [data, setData] = useState([])

    const userLogged = async () => {
        const logged = sessionStorage.getItem('logged')
        const access = await authService.getByUsername(logged)
        setData(access.lodgments)
    }

    const navigate = useNavigate()

    const handleClick = () => {
        authService.logOutUser();
        navigate('/create')
    }

    useEffect(() => {
        userLogged()
    }, [])

    return (
        <div className='page-conteiner'>
            <Grid container spacing={1}>
                {data.map((item) => 
                    <PublicationCard publication={item} />
                )}
            </Grid>
            <Fab
                className='primary-color'
                aria-label='add'
                sx={{ position: 'fixed', bottom: '65px', right: '25px', color:'white'}}
                onClick={handleClick()}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}
