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
    if(action.type === 'REQUEST'){
      return {
        ... state,
        loading: true
      }
    }
    if(action.type === 'SUCCESS'){
      return {
        ... state,
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
      
    // useEffect que atualiza o Banco de Dados e carrega o mesmo.
    useEffect(() => {
        dispatch({ type: 'REQUEST'})
        axios
          .get(baseURL + resource + '.json')
          .then(res => {
           /* setData({
              loading: false,
              data : res.data
            }) */
            dispatch({ type: 'SUCCESS', data: res.data})
          })
        }, [])
        return data
    }

    // Funcao que adiciona um novo item a lista.
    const usePost = resource => {

        // Estado contendo os dados.
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        
        // Funcao que adiciona um novo item a lista.
        const post = data => {
            dispatch({type: 'REQUEST'})
            axios
            .post(baseURL + resource + '.json', data)
            .then(res => {
                dispatch({
                    type: 'SUCCESS',
                    data: res.data
                })
              console.log(res.data)
            })
        
          }
        return [data,post]
    }

    // Funcao que deleta um item da lista pelo id.
    const useDelete = () => {

        // Estado contendo os dados.
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        
        // Funcao que deleta um item da lista pelo id.
        const remove = resource => {
            dispatch({type: 'REQUEST'})
            axios
            .delete(baseURL + resource + '.json')
            .then(() => {
                dispatch({
                    type: 'SUCCESS'
                })
            })
        
          }
        return [data,remove]
    }

    return {
        useGet,
        usePost,
        useDelete
    }
}



export default init