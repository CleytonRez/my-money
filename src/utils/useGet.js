import { useReducer, useEffect } from "react"
import axios from "axios"

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

// Funcao que carrega as informacoes do BackEnd.
const useGet = url => {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  })

  // useEffect que atualiza o Banco de Dados e carrega o mesmo.
  useEffect(() => {
    dispatch({ type: 'REQUEST' })
    axios
      .get(url)
      .then(res => {
        /* setData({
           loading: false,
           data : res.data
         }) */
        dispatch({ type: 'SUCCESS', data: res.data })
      })
  }, [])
  return data
}
export default useGet