// Arquivo para a reducao de codigo

// Imports
import { useReducer, useEffect } from "react";
import axios from "axios";

// Componente contendo o objeto que é repetido varias vezes.
const INITIAL_STATE = {
  loading: false,
  data: {}
}

// Funcao Pura
const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }
  // Manipular o estado.
  return state
}

// Funcao que pega a baseURL como parametro.
const init = baseURL => {

  // Funcao que mostra a lista.
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const carregar = async () => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.get(baseURL + resource + '.json')
      dispatch({ type: 'SUCCESS', data: res.data })
    }

    // useEffect que atualiza o Banco de Dados e carrega o mesmo.
    useEffect(() => {
      carregar()
    }, [resource])
    return {
      ...data,
      refetch: carregar
    }
  }

  // Funcao que adiciona um novo item a lista.
  const usePost = resource => {

    // Estado contendo os dados.
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    // Funcao que adiciona um novo item a lista.
    const post = async (data) => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.post(baseURL + resource + '.json', data)
      dispatch({
        type: 'SUCCESS',
        data: res.data
      })

    }
    return [data, post]
  }

  // Funcao que deleta um item da lista pelo id.
  const useDelete = () => {

    // Estado contendo os dados.
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    // Funcao que deleta um item da lista pelo id.
    const remove = async (resource) => {
      dispatch({ type: 'REQUEST' })
      await axios
        .delete(baseURL + resource + '.json')
      dispatch({
        type: 'SUCCESS'
      })

    }
    return [data, remove]
  }

  return {
    useGet,
    usePost,
    useDelete
  }
}



export default init