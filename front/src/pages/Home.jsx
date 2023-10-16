import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './Home.css';

const Home = () => {
  const [loadingButton, setLoadingButton] = useState(false)
  const [loginViwer, setLoginViwer] = useState(true)
  const history = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required')
  });

  const singIn = (form) => {
    setLoadingButton(true)
    axios.post('http://localhost:3333/login', form)
      .then((response) => {
        const novaChave = 'jwtToken';
        form[novaChave] = response.data.jwtToken
        console.log(form)
        console.log('response.data', response.data)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('token', response.data.jwtToken)
        localStorage.setItem('email', response.data.email)
        history('/tasks')
        setLoadingButton(false)
      })
      .catch((error) => {
        console.error('Erro:', error);
        setLoadingButton(false)
      })
  }

  const singUp = (form) => {
    setLoadingButton(true)
    axios.post('http://localhost:3333/register', form)
      .then((response) => {
        response.data !== 'Usuário já cadastrado' && singIn(form)
        setLoadingButton(false)
      })
      .catch((error) => {
        console.error('Erro:', error);
        setLoadingButton(false)
      })
  }
  return (

    loginViwer ?
      <>

        <Box className='pageLogin'>
          <Paper className='formLogin'>
            <Typography> Login</Typography>
          <Formik
              initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              singIn(values)
            }}
          >
            {formik => (
                <Form style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                  <Field style={{ margin: '10px' }} type="text" name="email" label="Email" as={TextField} />
                  <ErrorMessage style={{ marginLeft: '10px', color: 'red' }} name="email" component="div" />
                <Field
                    className='passwordPlace'
                    variant='outlined'
                  style={{ margin: '10px' }}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                  multiline
                />
                  <LoadingButton style={{ margin: '10px' }} loading={loadingButton} type="submit" variant="contained" color="primary">
                    Conectar
                  </LoadingButton>
                  <LoadingButton style={{ background: 'none', border: 'none', marginTop: '30px' }} onClick={() => setLoginViwer(false)}>
                    Criar Conta
                  </LoadingButton>
                </Form>
            )}
            </Formik>
          </Paper>
        </Box>
      </>
      :
      <>
        <Box className='pageLogin'>
          <Paper className='formLogin'>
            <div style={{ display: 'flex', width: '200PX', 'align-items': 'center', 'margin-bottom': '40px' }}>
              <Button>
                <ArrowBackIcon onClick={() => setLoginViwer(true)} />
              </Button>
              <Typography> Criar Conta</Typography>
            </div>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                singUp(values)
              }}
            >
              {formik => (
                <Form style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                  <Field style={{ margin: '10px' }} type="text" name="email" label="Email" as={TextField} />
                  <ErrorMessage style={{ marginLeft: '10px', color: 'red' }} name="email" component="div" />
                  <Field
                    style={{ margin: '10px' }}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Descrição"
                    className='passwordPlace'
                  />
                  <LoadingButton loading={loadingButton} style={{ marginTop: '30px' }} type="submit" variant="contained" color="primary" >
                    Criar
                  </LoadingButton>
                </Form>
              )}
            </Formik>
        </Paper>
        </Box >
    </>
  )
}

export default Home;