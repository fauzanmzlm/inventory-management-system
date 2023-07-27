// This file defines a JavaScript class called "AppStorage," which handles storing and retrieving the user's token and name in local storage.

class AppStorage {

    // Store Token
    storeToken (token) {
        localStorage.setItem('token', token)
    }

    // Store User
    storeUser (user) {
        localStorage.setItem('user', user)
    }

    store (token, user) {
        this.storeToken(token)
        this.storeUser(user)
    }

    // This method removes the token and user from local storage.
    clear () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    // Retrieve Token
    getToken () {
        localStorage.getItem('token');
    }

    // Retrieve User
    getUser () {
        localStorage.getItem('user');
    }

}

export default AppStorage = new AppStorage();