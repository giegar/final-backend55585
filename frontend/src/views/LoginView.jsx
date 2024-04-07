import {TextField, Button, Grid, Typography} from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';

export const LoginView = () => {

    const initialValues = {
        email:'',
        password:''
    }
    
    const validationSchema = Yup.object({
        email:Yup.string().required('El email es obligatorio').email('Email invalido'),
        password:Yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres')
    })

    const { values, handleChange, errors } = useFormik({ initialValues, validationSchema });

    const { email, password } = values;

    const onSubmit = () => {
        const isEmpty = Object.keys(errors).length===0
        if (!isEmpty) return

        console.log({email, password})
    }

    const disabled = (email != '' && password != '') ? false : true;

  return (
    <Grid container spacing={0} direction='column' alignItems='center' sx={{minHeight: '100vh', backgroundColor: 'greenyellow'}} justifyContent='center'>

        <Grid sx={{ width:450, backgroundColor: 'white', borderRadius: 2, padding: 3}}>

            <Grid container direction='column' alignItems='center'>
                <Typography variant='h3'>
                    Iniciar sesión
                </Typography>
            </Grid >

            <Grid container direction='column' >
                <Grid item mt={2}> 
                    <TextField name='email' type="email" value={email} label="Email" variant="outlined" fullWidth onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email}/>
                </Grid>
                <Grid item mt={2}>
                    <TextField name='password' type="password" value={password} label="Contraseña" variant="outlined" fullWidth error={Boolean(errors.password)} onChange={handleChange} helperText={errors.password}/>
                </Grid>
                <Grid item mt={2} alignSelf='center'>
                    <Button disabled={disabled} onClick={onSubmit} variant="contained"> Iniciar sesión </Button>
                </Grid>
                <Grid item mt={2} alignSelf='center'>
                    <Link to='/auth/register'>Si no tenes una cuenta registrate</Link>
                </Grid>
            </Grid >

        </Grid>

    </Grid>
    
  )
}
