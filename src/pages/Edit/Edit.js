import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lodgmentService } from './../../services/lodgmentService';
import { FormControl, FormHelperText, FormLabel, Input, MenuItem, Select, Stack, TextField } from '@mui/material';
import CommentCard from './../Detalle/components/CommentCard';
import { Box, Divider } from '@mui/material';
import { Button } from '@mui/material';
import ErrorMessage from './../../components/error-message/ErrorMessage';
import LocationOnIcon  from '@mui/icons-material/LocationOn';
import BrushIcon  from '@mui/icons-material/Brush';
import './Edit.css'
import { authService } from '../../services/auth.service';
import { Lodgment } from '../../domain/Lodgment';
import Swal from 'sweetalert2'


const Edit = () => {
    
    const navigate = useNavigate()
    
    const [lodgment, setLodgment] = useState({
        type: null,
        ownerId: sessionStorage.getItem('logged'), 
        baseCost: null, 
        name: null, 
        description: null, 
        capacity: 1,
        bedrooms: 1,
        bathrooms: 1,
        accommodationDetail: null,
        otherAspects: null,
        cleaningService: false,
        address: null,
        country: null,
        imageUrl: null,
        rate: [],
        rateScores: [],
        commission: 1.05,
        reserves: [],
        valid: true
    })
    
    const [error, setError] = useState({
        name: false,
        baseCost: false,
        description: false,
        capacity: false,
        bedrooms: false,
        bathrooms: false,
        accommodationDetail: false,
        otherAspects: false,
        address: false,
        country: false,
        imageUrl: false,
        type: false,
    })
    const [errorMessage, setErrorMessage] = useState('')

    const validatePassengers = e => {
        console.log(e.target.value);
        if(!e.target.value) {
            setError(true)
            setErrorMessage("Debe especificar la cantidad de pasajeros")
        } else {
            setError(false)
            updateLodgment(e)
        }
    }

    const validateField = e => {

        console.log(e.target);
        switch(e.target.type) {
            case 'text': 
                error[e.target.name] = e.target.value.length < 4
                setError({...error})
                break
            case 'number':
                error[e.target.name] = !!e.target.value? e.target.value < 1 : true
                setError({...error})
                break
            

            default: return 'NO ENTRARAARA'
        }
    }

    const validateAllFields = () => {
        console.log(error);
        console.log(lodgment);
        const erroresInput = Object.values(error).some(e => e === true)
        const espaciosNulos = Object.values(lodgment).some (e => e == null)
        console.log(erroresInput);
        console.log(espaciosNulos);
        return erroresInput || espaciosNulos
    }

    const validateByName = e => {
        switch(e.target.name) {
            case 'description':
                error[e.target.name] = e.target.value.length < 4
                setError({...error})
                break
            case 'accommodationDetail':
                error[e.target.name] = e.target.value.length < 4
                setError({...error})
                break
            case 'otherAspects':
                error[e.target.name] = e.target.value.length < 4
                setError({...error})
                break
            case 'type':
                console.log(e.target);
                error[e.target.name] = e.target.value === undefined
                setError({...error})
                break
            default: return 'NO ENTRARAARA'
        }
    }

    const updateLodgment = (e) => {
        lodgment[e.target.name] = e.target.value

        setLodgment({...lodgment})
    }

    const createLodgment = async (e) => {

        e.preventDefault()

        try { 

            const user = await authService.getByUsername(sessionStorage.getItem('logged'))
            lodgment.ownerId = user.id
            setLodgment({...lodgment})
    
            const ldg = Object.assign(new Lodgment(), lodgment)
    
            lodgmentService.createLodgment(ldg)

            Swal.fire({
                icon: "success",
                title:  'Alojamiento creado',
                showConfirmButton: true,
                confirmButtonText: 'Regresar al inicio',
                confirmButtonColor: 'var(--primary-color)'
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    navigate('/home')
                }
            })
        } catch(error) {
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

    useEffect( () => {

    }, [error, lodgment])
    
    
    
    return <> 
        <Stack justifyContent={"space-around"}>
            <Stack flexDirection={"row"} flexWrap={"wrap"} bgcolor={"#FDFDFD"} justifyContent={"space-around"} alignItems="flex-end">
                <Stack p={3} gap={3} className="detalle-view" flexDirection={"column"} flexWrap={"wrap"} alignContent={"center"} >
                    <FormControl required className='lg-field' error = {error.name} > 
                        <FormLabel  htmlFor='name'>
                            Titulo    
                        </FormLabel>
                        <Input type='text' name='name' className="detalle-titulo" onChange={ e => updateLodgment(e) } onBlur={e => validateField(e)} /> 
                        {error.name ? <FormHelperText color='red'>Por favor ingresar un titulo mayor a 4 caracteres</FormHelperText> : null} 
                    </FormControl>

                    <Stack justifyContent={"space-between"} flexDirection={"row"}>
                        <Stack flexDirection={"row"} gap={2}>
                            <FormControl required className='lg-field' error = {error.address}>
                                <FormLabel htmlFor='address'> Direccion </FormLabel>
                                <Input type="text" name='address' className="bold-text" placeholder='Ingresar direccion del alojamiento' onChange={ e => updateLodgment(e) }  onBlur={e => validateField(e)}/>
                                {error.address ? <FormHelperText color='red'>Por favor ingresar una direccion mayor a 4 caracteres</FormHelperText> : null}
                            </FormControl>
                            <FormControl required className='lg-field'  error = {error.country}>
                                <FormLabel htmlFor='country'> Pais </FormLabel> 
                                <Input type="text" name='country' placeholder='Ingrese pais del alojamiento' onChange={ e => updateLodgment(e) }  onBlur={e => validateField(e)}/>
                                {error.country ? <FormHelperText color='red'>Por favor ingresar un pais</FormHelperText> : null}
                            </FormControl>
                            <LocationOnIcon htmlColor='#FF385C' className="align-centered lg-icon"/>
                        </Stack>
                    </Stack>
                    <FormControl required className='lg-field' error = {error.imageUrl}>
                        <FormLabel htmlFor='imageUrl'>Url de imagen</FormLabel>
                        <Input type='text' name='imageUrl' placeholder='Ingrese url de la imagen del alojamiento' onChange={ e => updateLodgment(e) }  onBlur={e => validateField(e)}></Input>
                        {error.imageUrl ? <FormHelperText color='red'>Por favor ingresar un link</FormHelperText> : null}
                    </FormControl>
                </Stack>

                <Stack p={3} gap={3} className="detalle-costo" justifyContent={"center"} alignContent={"center"}>
                    <Stack flexDirection={"row"} className="align-centered" gap={1}>
                        <BrushIcon className="align-centered"/> 
                        <p className="bold-text">¿Cuenta con servicio de limpieza?</p> 
                        <Input type='checkbox' name='cleaningService' onChange={ e => updateLodgment(e) }  onBlur={e => validateField(e)}/>
                    </Stack>
                    

                    <Stack gap={2} borderRadius={1} border={"solid 2px #FF385C"} minWidth={'400px'}>
                        <Stack px={2} flexDirection={"row"} justifyContent={"center"} gap={5}>
                            <Stack flexDirection={"row"} justifyContent={"center"} gap={2} >
                                <p className="sm-text bold-text align-centered">Costo base&nbsp;$ </p>  
                                <FormControl required error = {error.baseCost}>
                                    <Input type="number" name='baseCost' className="bold-text large-text" onChange={e => updateLodgment(e)} onBlur={e => validateField(e)}/>
                                    {error.baseCost ? <FormHelperText color='red'>Por favor ingresar un costo mayor a 0</FormHelperText> : null}
                                </FormControl>

                            </Stack>
                        </Stack>

                        <Stack width={"90%"} flexWrap={"wrap"} divider={<Divider orientation="vertical" flexItem color="#FF385C"/>} flexDirection={"row"} margin={"auto"} justifyContent={"start"} border={"solid 2px #FF385C"} borderRadius={1}>
                        <Stack flexGrow={0.1} justifyContent={"center"} p={"5px"}>
                                <FormControl required className='sm-field' error = {error.capacity}>
                                    <FormLabel for="capacity" className="bold-text">Pasajeros</FormLabel>
                                    <Input id="capacity" name="capacity" type="number" min="1" defaultValue="1" onChange={e => updateLodgment(e)}  onBlur={e => validateField(e)}/>
                                    {error.capacity ? <FormHelperText color='red'>Por favor ingresar una capacidad mayor a 0</FormHelperText> : null}
                                </FormControl>                             
                            </Stack>

                            <Stack flexGrow={0.1} justifyContent={"center"} p={"5px"}>
                                <FormControl required className='sm-field' error = {error.bedrooms}>
                                    <FormLabel for="bedrooms" className="bold-text">Dormitorios</FormLabel>
                                    <Input id="bedrooms" name="bedrooms" type="number" min="1" defaultValue="1" onChange={e => updateLodgment(e)}  onBlur={e => validateField(e)}/>
                                    {error.bedrooms ? <FormHelperText color='red'>Por favor ingresar un numero de dormitorios mayor a 0</FormHelperText> : null}
                                </FormControl>                             
                            </Stack>
                            <Stack flexGrow={0.1} px={1} py={1} justifyContent={"center"} alignContent={"start"} p={"5px"}>
                                <FormControl required className='sm-field' error = {error.bathrooms}>
                                    <FormLabel for="bathrooms" className="bold-text">Baños</FormLabel>
                                    <Input id="bathrooms" name="bathrooms" type="number" min="1" defaultValue="1" onChange={e => updateLodgment(e)}  onBlur={e => validateField(e)}/>
                                    {error.bathrooms ? <FormHelperText color='red'>Por favor ingresar un numero de baños mayor a 0</FormHelperText> : null}
                                </FormControl>
                            </Stack>
                        </Stack>

                        <Stack width={"90%"} margin={'auto'}>
                            <FormControl required error={ error.type }>
                                <FormLabel htmlFor='type'>
                                    Tipo de alojamiento
                                </FormLabel>
                                <Select className='primary-select' name='type' onChange={e => updateLodgment(e)}  onBlur={e => validateByName(e)}>
                                    <MenuItem value='Cabin'>
                                        Cabin
                                    </MenuItem>
                                    <MenuItem value='House'>
                                        House
                                    </MenuItem>
                                    <MenuItem value='Department'>
                                        Department
                                    </MenuItem>
                                </Select>
                                {error.type ? <FormHelperText color='red'>Por favor ingresar un tipo de alojamiento</FormHelperText> : null}
                            </FormControl>
                        </Stack>
                        
                        <Stack flexDirection={"row"} justifyContent={"center"}>
                            {error? <ErrorMessage message={errorMessage}/> : null}
                        </Stack>
                            
                    </Stack>
                </Stack>
            </Stack>

            <Stack gap={2} px={2} mb={5} alignItems={'center'}>
                <Box>

                    <FormControl error={ error.description }>
                        <FormLabel htmlFor='description' className="bold-text">Descripcion</FormLabel>
                        
                        <TextField multiline name='description' className='xl-field' onChange={e => updateLodgment(e)} onBlur={e => validateByName(e)}/>
                        {error.description ? <FormHelperText color='red'>Por favor ingresar una descripcion mayor a 4 caracteres</FormHelperText> : null}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl error={ error.accommodationDetail }>
                        <FormLabel htmlFor='accommodationDetail' className="bold-text">El alojamiento</FormLabel>
                        
                        <TextField multiline name='accommodationDetail' className='xl-field' onChange={e => updateLodgment(e)} onBlur={e => validateByName(e)}/>
                        {error.accommodationDetail ? <FormHelperText color='red'>Por favor ingresar una detalle de alojamiento mayor a 4 caracteres</FormHelperText> : null}
                    </FormControl>
                </Box>
                <Box>
                <FormControl error={ error.otherAspects }>
                        <FormLabel htmlFor='otherAspects' className="bold-text ">Otros Aspectos</FormLabel>
                        
                        <TextField multiline name='otherAspects' className='xl-field' onChange={e => updateLodgment(e)} onBlur={e => validateByName(e)}/>
                        {error.otherAspects ? <FormHelperText color='red'>Por favor ingresar otros aspectos del alojamiento mayor a 4 caracteres</FormHelperText> : null}
                    </FormControl>
                </Box>
            </Stack>
            <Box justifySelf={"center"} alignSelf={"center"} width={"95%"} >
                <Button variant="contained" className={validateAllFields() ?  "bg-disabled lg-button justify-centered" : "bg-primary lg-button justify-centered" } disabled={validateAllFields()} onClick={e => createLodgment(e)}>Reservar</Button>
             </Box>
        </Stack>
    </>
}

export default Edit