// This file defines a JavaScript class called "User" which contains methods related to handling user authentication and token management.

// Import Class
import Token from './Token';
import AppStorage from './AppStorage';

class User {
    
    // This method extracts the access token and username  from the login response and stores them in local storage using the "AppStorage" class.
    responseAfterLogin(response) {
        const access_token = response.data.access_token
        const username = response.data.name

        if (Token.isValid(access_token)) {
            AppStorage.store(access_token, username)
        }
    }

    // Checks if there is a valid token in local storage.
    hasToken () {
        const storeToken = localStorage.getItem('token');
        if (storeToken) {
            return Token.isValid(storeToken) ? true : false
        }
        return false
    }

    // Returns true if the user is logged in (i.e., has a valid token).
    loggedIn () {
        return this.hasToken()
    }

    // Returns the user's name if they are logged in.
    name () {
        if (this.loggedIn()) {
            return localStorage.getItem('user');
        }
    }

    // Returns the user's ID if they are logged in, by decoding the token and extracting the "sub" claim.
    id () {
        if (this.loggedIn()) {
            const payload = Token.payload(localStorage.getItem('token'));
            
            return payload.sub
        }
        return false
    }

}

export default User = new User()