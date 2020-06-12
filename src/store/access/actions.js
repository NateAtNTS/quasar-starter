import axios from 'axios'

export function loginRequest({ state, commit, dispatch, rootState }, user) {

  const ajax = axios.create({
    baseURL: state.baseURL,
    timeout: 5000
  })
  return ajax.post('api/login', user)
}
