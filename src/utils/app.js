import cookie from "cookie_js";

const TOKEN = 'token'
const USERNAME = 'username'

export function getToken() {
    return cookie.get(TOKEN)
}

export function setToken(token) {
    cookie.set(TOKEN, token)
}

export function removeToken() {
    cookie.remove(TOKEN)
}

export function setUsername(username) {
    cookie.set(USERNAME, username)
}

export function getUsername() {
    return cookie.get(USERNAME)
}

export function removeUsername() {
    cookie.remove(USERNAME)
}

export function removeLogin(){
    removeToken();
    removeUsername();
}