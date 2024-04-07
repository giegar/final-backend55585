
import {TextField, Button, Grid, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

export const RegisterView = () => {

    const initialValues = {
        nane:'',
        lastname:'',
        email:'',
        password:''
    }
    
    const validationSchema = Yup.object({
        name:Yup.string().required('El nombre es obligatorio'),
        lastname:Yup.string().required('El apellido es obligatorio'),
        email:Yup.string().required('El email es obligatorio').email('Email invalido'),
        password:Yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres')
    })

    const { values, handleChange, errors } = useFormik({ initialValues, validationSchema });

    const { name, lastname, email, password } = values;

    const onSubmit = () => {
        const isEmpty = Object.keys(errors).length===0
        if (!isEmpty) return

        console.log({email, password, name, lastname})
    }

    const disabled = (email != '' && password != '' && name != '' && lastname != '') ? false : true;

  return (
    <Grid container spacing={0} direction='column' alignItems='center' sx={{minHeight: '100vh', backgroundColor: 'greenyellow'}} justifyContent='center'>

        <Grid sx={{ width:450, backgroundColor: 'white', borderRadius: 2, padding: 3}}>

            <Grid container direction='column' alignItems='center'>
                <Typography variant='h3'>
                    Registrate
                </Typography>
            </Grid >

            <Grid container direction='column' >

                <Grid item mt={2}> 
                    <TextField name="name" value={name} type="name" label="Nombre" variant="outlined" fullWidth size="small" error={Boolean(errors.name)} onChange={handleChange} helperText={errors.name}/>
                </Grid>

                <Grid item mt={2}> 
                    <TextField name="lastname" value={lastname} type="lastname" label="Apellido" variant="outlined" fullWidth size="small" error={Boolean(errors.lastname)} onChange={handleChange} helperText={errors.lastname}/>
                </Grid>

                <Grid item mt={2}> 
                    <TextField name="email" value={email} type="email" label="Email" variant="outlined" fullWidth size="small" error={Boolean(errors.email)} onChange={handleChange} helperText={errors.email}/>
                </Grid>

                <Grid item mt={2}>
                    <TextField name="password" value={password} type="password" label="Contraseña" variant="outlined" fullWidth size="small" error={Boolean(errors.password)} onChange={handleChange} helperText={errors.password}/>
                </Grid>

                <Grid item mt={2} alignSelf='center'>
                    <Button disabled={disabled} onClick={onSubmit} variant="contained"> Registrarse </Button>
                </Grid>

                <Grid item mt={2} alignSelf='center'>
                    <Link to='/auth/login'>Si ya tenes una cuenta inicia sesión</Link>
                </Grid>

            </Grid >

        </Grid>

    </Grid>
    
  )
}