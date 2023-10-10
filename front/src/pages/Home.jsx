import { Button, Paper } from '@mui/material';
import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [pendingItens, setPendingItens] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 1', 'Item 2', 'Item 3',]);
  const [doingItens, setDoingItens] = useState([]);
  const [doneItens, setDoneItens] = useState([])

  const moveToDoingItens = (item) => {
    setPendingItens(pendingItens.filter((i) => i !== item));
    setDoingItens([...doingItens, item]);
  };

  const returnToDoItens = (item) => {
    setDoingItens(doingItens.filter((i) => i !== item));
    setPendingItens([...pendingItens, item]);
  };

  const moveToDoneItens = (item) => {
    setDoingItens(doingItens.filter((i) => i !== item))
    setDoneItens([...doneItens, item]);
  }

  const returnToDoingItens = (item) => {
    setDoneItens(doneItens.filter((i) => i !== item))
    setDoingItens([...doingItens, item])
  }


  return (
    <div className='home'>
      <Paper className='Paper' elevation={3}>
        <h2>A iniciar</h2>
        <ul>
          {pendingItens.map((item, index) => (
            <li key={index}>
              {item}
              <Button onClick={() => moveToDoingItens(item)}>Move Right</Button>
            </li>
          ))}
        </ul>
      </Paper>
      <Paper className='Paper' elevation={3}>
        <h2>Em Andamento</h2>
        <ul>
          {doingItens.map((item, index) => (
            <li key={index}>
              {item}
              <Button onClick={() => returnToDoItens(item)}>Retornar</Button>
              <Button onClick={() => moveToDoneItens(item)}>Avançar</Button>
            </li>
          ))}
        </ul>
      </Paper>
      <Paper className='Paper' elevation={3}>
        <h2>Concluidas</h2>
        <ul>
          {doneItens.map((item, index) => (
            <li key={index}>
              {item}
              <Button onClick={() => returnToDoingItens(item)}>Retornar</Button>
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  );
};

export default Home;
