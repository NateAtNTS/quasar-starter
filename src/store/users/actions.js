import HTTP from "../../http-common";

export function getUsers({state, commit, rootState}) {
  return HTTP.get("users").then( response => {
    commit("setUsers",response.data.users)
    commit("setUsersLoaded")
  })
}

export function updateUser({state, commit, rootState}, payload) {
  return HTTP.post("user/update", payload)
}

export function addUser({state, commit, rootState}, payload) {
  console.log("payload is")
  console.log(payload)
  return HTTP.post("user/add", payload)
}

export function checkUsername({state, commit, rootState}, payload) {
  return HTTP.post("user/check-username", payload)
}

