// This file defines a JavaScript class called "User," 
// which contains methods related to handling user 
// authentication and token management.

// Import Class
import Token from './Token';
import AppStorage from './AppStorage';

class User {
    
    // This method extracts the access token and username from the login response and stores them in local storage using the "AppStorage" class.
    responseAfterLogin(response) {
        const access_token = response.data.access_token
        const username = response.data.name

        if (Token.isValid(access_token)) {
            AppStorage.store(access_token, username)
        }
    }

    hasToken () {
        const storeToken = localStorage.getItem('token');
        if (storeToken) {
            return Token.isValid(storeToken) ? true : false
        }
        return false
    }

    loggedIn () {
        return this.hasToken()
    }

    name () {
        if (this.loggedIn()) {
            return localStorage.getItem('user');
        }
    }

    id () {
        if (this.loggedIn()) {
            const payload = Token.payload(localStorage.getItem('token'));

            return payload.sub
        }
        return false
    }
    
}

export default User = new User()