import React from "react";
import useGet from "./useGet";

/*
axios
.get('https://mymoney-cleyton-default-rtdb.firebaseio.com/valor.json')
.then(res => {
  console.log(res.data)
})*/

/*
axios
.post('https://mymoney-cleyton-default-rtdb.firebaseio.com/valor.json', {
  outro: 'Cleyton Rezende'
})
.then(res=> {
  console.log(res)
})
*/

// Variavel contendo a url.
const url = 'https://mymoney-cleyton-default-rtdb.firebaseio.com/movimentacoes/2019-08.json'

// Componente Pricipal
function App() {

  //Variavel que chama a funcao useGet.
  const data = useGet(url)

  //Variavel contendo a url 2.
  const data2 = useGet('http://httpbin.org/ip')

  // Retorna o HTML Principal.
  return (
    <div>
      <h1>MyMoney</h1>
      {JSON.stringify(data)}
      {data.loading && <p>Loading...</p>}
      <pre>{JSON.stringify(data2)}</pre>
    </div>
  );
}

export default App;
