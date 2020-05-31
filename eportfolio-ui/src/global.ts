import * as jwt_decode from "jwt-decode";
export const backend_path =  'http://localhost:8080/'
export const front_path =  'http://localhost:4200/'
export var jwt = null;
export var username = null;
export var userID = null;
export function refreshJwt() {
  let curJwt = localStorage.getItem("jwt_token")
  if (curJwt != jwt){
    jwt = curJwt
    let decodeJwt = (jwt != null) ? jwt_decode(jwt) : null
    username = (jwt != null) ? decodeJwt.username : null
    userID = (jwt != null) ? decodeJwt.id : null
  }
}

export function changeUID(){
  userID = sessionStorage.getItem('uid')
}
export function recoverAdminID(){
  userID = sessionStorage.getItem('admin_id')
}

refreshJwt()
