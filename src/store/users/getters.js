export function getUsers(state) {
  return state.users
}

export function countUsers(state) {
  return state.users.length
}

export function usersLoaded(state) {
  return state.usersLoaded
}

export function usersById(state) {
  return state.usersById
}
