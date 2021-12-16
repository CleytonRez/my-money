import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from "./elements/Header";
import Home from './pages/Home/index'
import Movimentacoes from './pages/Movimentacoes'
import Rest from './utils/rest'

const baseURL = 'https://mymoney-cleyton-default-rtdb.firebaseio.com/'

const { useGet, usePost, useDelete } = Rest(baseURL)


// Componente Pricipal
function App() {

  // Retorna o HTML Principal.
  return (
    <Router>
      <div>
        <Header />
        <Switch >
          <Route path='/' exact component={Home} />
          <Route path='/movimentacoes/:data' component={Movimentacoes} />
        </Switch >
      </div>
    </Router>
  );
}

export default App;
