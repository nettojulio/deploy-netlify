import {
  Typography
} from '@material-ui/core';
import React, { useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import useLoja from '../../hook/useLoja';
import { get } from '../../services/ApiClient';
import Sidebar from '../Sidebar';
import useStyles from './styles';


function Main({ children }) {
  const classes = useStyles();
  const { token } = useAuth();
  const { nomeLoja, atualizar } = useLoja();

  useEffect(() => {
    async function carregarUsuario() {
      const { dados } = await get('perfil', token);

      atualizar(dados.nome_loja);
    }

    carregarUsuario();
  // eslint-disable-next-line
  }, [token]);

  return (
    <div className={classes.root}>
      <Sidebar/>
      <div className={classes.container}>
        <Typography variant="h2">{nomeLoja}</Typography>
        {children}
      </div>
    </div>
  )
}

export default Main;
