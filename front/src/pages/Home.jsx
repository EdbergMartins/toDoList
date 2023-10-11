import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Modal, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './Home.css';

const Home = () => {
  const [pendingItens, setPendingItens] = useState([]);
  const [doingItens, setDoingItens] = useState([]);
  const [doneItens, setDoneItens] = useState([])
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loadingButton, setLoadingButton] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleResize = () => {
    // Aquí puedes realizar acciones cuando la pantalla cambie de tamaño
    setScreenWidth(window.innerWidth)
  }
  window.addEventListener('resize', handleResize);


  const validationSchema = Yup.object({
    title: Yup.string().required('O titulo é obrigatória'),
  });

  const sendForm = (from) => {
    axios.post('http://localhost:3333/tasks', from)
      .then((response) => {
        setPendingItens([...pendingItens, from]);
        handleClose()
        setLoadingButton(false)
      })
      .catch((error) => {
        console.error('Erro:', error);
      })
  }


  useEffect(() => {
    if (data === null) {
      axios.get('http://localhost:3333/tasks')
        .then((response) => {
          setData(response.data);
          const pendingList = []
          const doingList = []
          const doneList = []
          for (let i = 0; i < response.data.length; i++) {
            switch (response.data[i].status) {
              case "Pendente":
                pendingList.push(response.data[i])
                break;
              case 'Em Andamento':
                doingList.push(response.data[i])
                break;
              case 'Concluída':
                doneList.push(response.data[i])
                break;
              default:
                break;
            }
          }
          setPendingItens(pendingList)
          setDoingItens(doingList)
          setDoneItens(doneList)
        })
        .catch((error) => {
          console.error('Erro:', error);
        });
    }
  }, [data]);

  const moveToDoingItens = (item) => {
    const newItem = item
    newItem.status = 'Em Andamento'
    axios.patch('http://localhost:3333/tasks', newItem)
      .then((response) => {
        setPendingItens(pendingItens.filter((i) => i !== item));
        setDoingItens([...doingItens, item]);
      })
      .catch((error) => {
        console.error('Erro:', error);
      })
  };

  const returnToDoItens = (item) => {
    const newItem = item
    newItem.status = 'Pendente'
    axios.patch('http://localhost:3333/tasks', newItem)
      .then((response) => {
        setDoingItens(doingItens.filter((i) => i !== item));
        setPendingItens([...pendingItens, item]);
      })
      .catch((error) => {
        console.error('Erro:', error);
      })
  };

  const moveToDoneItens = (item) => {
    const newItem = item
    newItem.status = 'Concluída'
    axios.patch('http://localhost:3333/tasks', newItem)
      .then((response) => {
        setDoingItens(doingItens.filter((i) => i !== item))
        setDoneItens([...doneItens, item]);
      })
      .catch((error) => {
        console.error('Erro:', error);
      })
  }

  const returnToDoingItens = (item) => {
    const newItem = item
    newItem.status = 'Em Andamento'
    axios.patch('http://localhost:3333/tasks', newItem)
      .then((response) => {
        setDoneItens(doneItens.filter((i) => i !== item))
        setDoingItens([...doingItens, item])
      })
      .catch((error) => {
        console.error('Erro:', error);
      })
  }

  return (
    <>
      <Button
        style={screenWidth > 859 ? { margin: '10px' } : { margin: '30px' }}
        color='primary'
        variant="contained"
        onClick={handleOpen}
      >
        Adicionar Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setLoadingButton(true)
              sendForm(values)
            }}
          >
            {formik => (
              <Form style={{ display: 'flex', flexDirection: 'column' }}>
                <Field style={{ margin: '10px' }} type="text" name="title" label="Titulo" as={TextField} />
                <ErrorMessage style={{ 'margin-left': '10px', 'color': 'red' }} name="title" component="div" />
                <TextField
                  style={{ margin: '10px' }}
                  type="text"
                  id="outlined-textarea"
                  name="description"
                  label="Description"
                  placeholder="Descrição"
                  multiline
                />
                <LoadingButton style={{ margin: '10px' }} loading={loadingButton} type="submit" variant="contained" color="primary">Criar Task</LoadingButton>
              </Form>

            )}
          </Formik>  
        </Box>
      </Modal>
      <div className='home'>
        <Paper className='Paper' elevation={3}>
          <div className='headerPaper'>
            <h2>
              A iniciar ({pendingItens.length})
            </h2>
          </div>
          <ul>
            {pendingItens.map((item, index) => (
              <li key={index}>
                <div className='listPapers'>
                  <span className='textTitle'>
                    {item.title}
                  </span>
                  <Button onClick={() => moveToDoingItens(item)}><ArrowCircleRightOutlinedIcon /></Button>
                </div>
              </li>
            ))}
          </ul>
        </Paper>
        <Paper className='Paper' elevation={3}>
          <h2>Em Andamento ({doingItens.length})</h2>
          <ul>
            {doingItens.map((item, index) => (
              <li key={index}>
                <div className='listPapers'>
                  {item.title}
                  <div>
                    <Button style={{ width: '5px' }} onClick={() => returnToDoItens(item)}><ArrowCircleLeftOutlinedIcon /></Button>
                    <Button onClick={() => moveToDoneItens(item)}><ArrowCircleRightOutlinedIcon /></Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Paper>
        <Paper className='Paper' elevation={3}>
          <h2>Concluidas ({doneItens.length})</h2>
          <ul>
            {doneItens.map((item, index) => (
              <li key={index}>
                <div className='listPapers'>
                  <span className='textTitle'>
                    {item.title}
                  </span>
                  <Button onClick={() => returnToDoingItens(item)}><ArrowCircleLeftOutlinedIcon /></Button>
                </div>
              </li>
            ))}
          </ul>
        </Paper>
      </div>
    </>
  );
};

export default Home;
