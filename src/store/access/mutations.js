
export function login(state) {
  state.loggedIn = true
}

export function setUser(state, user) {
  state.user = user
}

export function setToken(state, token) {
  state.token = token
}

export function logout(state) {
  localStorage.removeItem('SignOnByNTS')
  state.loggedIn = false
}

export function setLoginError(state) {
  state.bLoginError = true
}

export function clearLoginError(state) {
  state.bLoginError = false
}

export function setBaseURL(state, url) {
  state.baseURL = url
}
