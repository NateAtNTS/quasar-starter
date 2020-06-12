export function setUsers(state, users) {

  let tempUsers = {}

  users.forEach((user,index) => {
    tempUsers[user.id] = user
  })

  state.usersById = tempUsers
  state.users = users
}

export function setUsersLoaded(state) {
  state.usersLoaded = true
}

export function clearUsers(state) {
  state.users = []
  state.usersLoaded = false
}
