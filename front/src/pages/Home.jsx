import { Button, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [pendingItens, setPendingItens] = useState([]);
  const [doingItens, setDoingItens] = useState([]);
  const [doneItens, setDoneItens] = useState([])
  const [data, setData] = useState(null)

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
    <div className='home'>
      <Paper className='Paper' elevation={3}>
        <h2>A iniciar ({pendingItens.length})</h2>
        <ul>
          {pendingItens.map((item, index) => (
            <li key={index}>
              {item.title}
              <Button onClick={() => moveToDoingItens(item)}>Move Right</Button>
            </li>
          ))}
        </ul>
      </Paper>
      <Paper className='Paper' elevation={3}>
        <h2>Em Andamento ({doingItens.length})</h2>
        <ul>
          {doingItens.map((item, index) => (
            <li key={index}>
              {item.title}
              <Button onClick={() => returnToDoItens(item)}>Retornar</Button>
              <Button onClick={() => moveToDoneItens(item)}>Avançar</Button>
            </li>
          ))}
        </ul>
      </Paper>
      <Paper className='Paper' elevation={3}>
        <h2>Concluidas ({doneItens.length})</h2>
        <ul>
          {doneItens.map((item, index) => (
            <li key={index}>
              {item.title}
              <Button onClick={() => returnToDoingItens(item)}>Retornar</Button>
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  );
};

export default Home;
