import { Box, Stack } from "@mui/system"
import { Button, Divider, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BrushIcon from '@mui/icons-material/Brush';
import preview from "./img/room.jpg"
import './Detail.css'
import CommentCard from './components/CommentCard';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { lodgmentService } from "../../services/lodgmentService";
import { Reserve } from "../../domain/Reserve";
import Swal from 'sweetalert2'
import ErrorMessage from './../../components/error-message/ErrorMessage';
import { authService } from './../../services/auth.service';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { isReservedDate } from "./utils";

const Detail = () => {

    const navigate = useNavigate()
    const lodgmentId = useParams('id').id
    const today = new dayjs()
    const [dateValue, setDateValue] = useState(today)
    
    const getLodgment = async () => {

        const ldg = await lodgmentService.getById(lodgmentId)
        console.log("lodg", ldg);
        setLodgment(ldg)
    }

    const [lodgment, setLodgment] = useState(null)
    const [userReserves, setUserReserves] = useState(null)

    const [reserve, setReserve] = useState({
        userId: sessionStorage.getItem('logged'),
        lodgmentId: lodgment,
        startDate: null,   
        endDate: null,   
        cost: null
    })
    
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    const getUserReserves = async () => {
        const username = sessionStorage.getItem('logged')
        if( username !== null){

            const user = await authService.getByUsername(sessionStorage.getItem('logged'))
            console.log("USEEEER", user);
            setUserReserves(user.reserves)
        }
        
    }
    const handleStartDate = (date) => {

        if(date){

            setError(false)
            reserve.startDate = date.format('YYYY-MM-DD')
            setReserve( {...reserve} )
            setDateValue(date)
        } else{
            
            setError(true)
            setErrorMessage('Fecha reservada, por favor elegir una fecha disponible')
        
        }

        
        
    } 
    const handleEndDate = (date) => {

        if(date){
            setError(false)
            reserve.endDate = date.format('YYYY-MM-DD')
            setReserve( {...reserve} )
        } else{
            
            setError(true)
            setErrorMessage('Fecha reservada, por favor elegir una fecha disponible')
        
        }
    } 

    const validatePassengers = e => {
        console.log(e.target.value);
        if(!e.target.value) {
            setError(true)
            setErrorMessage("Debe especificar la cantidad de pasajeros")
        } 
        else if( (e.target.value > lodgment.capacity)) {
            setError(true)
            setErrorMessage(`Maxima capacidad de pasajeros: ${lodgment.capacity}`)
        } else {
            setError(false)
        }
    }

    const makeReserve = async (e) => {

        e.preventDefault()

        try{

            reserve.lodgmentId = lodgment.id
            reserve.cost = lodgment.totalCost()
            setReserve({...reserve})
    
            const reservation = Object.assign(new Reserve(), reserve)

            if(reservation.startDate && reservation.endDate){

                setError(false)
                // reservation.userReserve = await this.getById(1) 
                // console.log(reservation);

                authService.createReservation(reservation)
        
                Swal.fire({
                    icon: "success",
                    title:  'Reserva confirmada',
                    text: `${lodgment.name} para ${sessionStorage.getItem('logged')} desde ${reserve.startDate} hasta ${reserve.endDate}`,
                    showConfirmButton: true,
                    confirmButtonText: 'Regresar al inicio',
                    confirmButtonColor: 'var(--primary-color)'
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        navigate('/home')
                    }
                })
            } else {
                setError(true)
                setErrorMessage('Por favor, completar todos los campos')
            }

        } catch(error){
            Swal.fire({
                icon:"error",
                title:  'Hubo un problema',
                showConfirmButton: true,
                confirmButtonText: 'Regresar al inicio',
                confirmButtonColor: 'var(--primary-color)'
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    navigate('/home')
                }
            })
        }

    }

    useEffect(() => {
        getLodgment()
        getUserReserves()
    }, [])


    return lodgment? 
     <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack justifyContent={"space-around"}>
            <Stack flexDirection={"row"} flexWrap={"wrap"} bgcolor={"#FDFDFD"} justifyContent={"space-around"} alignItems="flex-end">
                <Stack p={3} gap={3} className="detalle-view" flexDirection={"column"} flexWrap={"wrap"} alignContent={"center"} >
                    <h1 className="detalle-titulo">
                        {lodgment.name}
                    </h1>
                    <Stack justifyContent={"space-between"} flexDirection={"row"}>
                        <Stack flexDirection={"row"}>
                            <StarIcon className="align-centered"/> 
                            <p className="bold-text">{lodgment.averageScore()} puntos</p>  <p> - {lodgment.rate.length} opiniones</p> 
                        </Stack>
                        <Stack flexDirection={"row"}>
                            <LocationOnIcon className="align-centered"/>
                            <p className="bold-text">{lodgment.address}</p> <p> - {lodgment.country}</p>
                        </Stack>
                    </Stack>
                    <img src={lodgment.imageUrl} alt="preview" className="preview-image"/>
                </Stack>

                <Stack p={3} gap={3} className="detalle-costo" justifyContent={"center"} alignContent={"center"}>
                    { lodgment.cleaningService? <Stack flexDirection={"row"} className="align-centered">
                        <BrushIcon className="align-centered"/> <p className="bold-text">Con servicio de limpieza</p> 
                    </Stack>
                    : null}

                    <Stack gap={2} borderRadius={1} py border={"solid 2px #FF385C"}>
                        <Stack px={2} flexDirection={"row"} justifyContent={"center"} gap={5}>
                            <Stack flexDirection={"row"} justifyContent={"center"} >
                                <p className="sm-text bold-text align-centered">Costo por noche&nbsp; </p>  <p className="bold-text large-text">${lodgment.baseCost}</p>
                            </Stack>
                            <Stack flexDirection={"row"} justifyContent={"center"} >
                                <p className="sm-text bold-text align-centered">Costo total&nbsp; </p>  <p className="bold-text large-text">${lodgment.totalCost()} </p>
                            </Stack>
                        </Stack>
                        <Stack flexDirection={"row"} className={"md-text"} justifyContent={"center"}>
                            <p>{lodgment.capacity} huespedes - &nbsp;</p> 
                            <p>{lodgment.bedrooms} Dormitorio - &nbsp;</p>
                            <p>{lodgment.bathrooms} baño</p>
                        </Stack>
                        <Stack width={"90%"} flexWrap={"wrap"} divider={<Divider orientation="vertical" flexItem color="#FF385C"/>} flexDirection={"row"} margin={"auto"} justifyContent={"center"} border={"solid 2px #FF385C"} borderRadius={1}>
                            <Stack flexGrow={0.1} justifyContent={"center"} margin={"auto"} py={"5px"}>
                                
                                {/* <input name="startDate" id="from-date" type="date" min={dateValue} defaultValue={today} onChange={ e => updateReserve(e) }></input> */}
                               <label for="from-date" className="bold-text">Desde</label>
                               <DatePicker id="from-date" name="startDate" disablePast={true} shouldDisableDate={date => isReservedDate(date, lodgment.reserves, userReserves)} onChange={ (date) => handleStartDate(date) }/>
                            </Stack>

                            <Stack flexGrow={0.1} justifyContent={"center"} margin={"auto"} >
                                <label for="to-date" className="bold-text">Hasta</label>
                                {/* <input name="endDate" id="to-date" type="date" min={today} defaultValue={today} onChange={ e => updateReserve(e) }></input> */}
                                <DatePicker id="to-date" name="endDate" minDate={dateValue} shouldDisableDate={date => isReservedDate(date, lodgment.reserves, userReserves)} onChange={ (date) => handleEndDate(date) }/>
                            </Stack>
                            <Stack flexGrow={1} px={3} py={1} justifyContent={"center"} alignContent={"start"} margin={"auto"} borderTop={"solid 2px #FF385C"}>
                                <label for="passengers" className="bold-text">Pasajeros</label>
                                <input id="passengers" type="number" min="1" max={lodgment.capacity} defaultValue="1" onChange={e => validatePassengers(e)}></input>
                            </Stack>
                        </Stack>
                        
                        <Stack flexDirection={"row"} justifyContent={"center"}>
                            {error? <ErrorMessage message={errorMessage}/> : null}
                        </Stack>
                        
                        <Box justifySelf={"center"} alignSelf={"center"} width={"95%"} onClick={ e =>  error? null : makeReserve(e) }>
                            <Button variant="contained" className={error || !userReserves ?  "bg-disabled lg-button justify-centered" : "bg-primary lg-button justify-centered" } disabled={error}>Reservar</Button>
                        </Box>
                            
                    </Stack>
                </Stack>
            </Stack>

            <Stack gap={2} px={2} mb={5}>
                <Box>
                    <p className="bold-text">Descripcion</p>
                    
                    <p>{lodgment.description}</p>
                </Box>
                <Box>
                    <p className="bold-text">El alojamiento</p>
                    
                    <p>{lodgment.accommodationDetail}</p>
                </Box>
                <Box>
                    <p className="bold-text">Otros aspectos para tener en cuenta</p>
                    
                    <p>{lodgment.otherAspects}</p>
                </Box>
            </Stack>

            {lodgment.rate.length > 0? <Stack gap={2} px={2} >
                <p className="bold-text">Comentarios</p>
                <Stack flexDirection={"row"} gap={2} flexWrap={"wrap"} justifyContent={"center"} pb={"40px"}>
                    {lodgment.rate.map( rate => {
                        return <CommentCard rateData={rate} />
                    })}
                </Stack>
            </Stack> 
            : null}
        </Stack>
    </LocalizationProvider>: <Stack minHeight={"100%"} width={"100vw"} margin={"auto"} textAlign={"center"}><CircularProgress /></Stack>

}

export default Detail