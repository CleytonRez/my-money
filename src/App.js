import React from "react";

import Rest from './rest'


const baseURL = 'https://mymoney-cleyton-default-rtdb.firebaseio.com/'

const {useGet, usePost, useDelete} = Rest(baseURL)

// Componente Pricipal
function App() {

  //Variavel que chama a funcao useGet.
  const data = useGet('movimentacoes/2019-08')
  const [postData, post] = usePost('movimentacoes/2019-08')
  const [deleteData, remove] = useDelete()

  const saveNew = () => {
    post({valor: 10, descricao: 'Alcool Gel'})
  }

  const doRemove = () => {
    remove('movimentacoes/2019-08/-MqzjShiHEy-weBJm5ds')
  }

  // Retorna o HTML Principal.
  return (
    <div>
      <h1>MyMoney</h1>
      {JSON.stringify(data)}
      {data.loading && <p>Loading...</p>}
      <button onClick={saveNew}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={doRemove}>Delete</button>
      <pre>{JSON.stringify(deleteData)}</pre>

    </div>
  );
}

export default App;
