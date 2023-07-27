//This file defines a JavaScript class called "Token," which provides methods related to token validation and decoding.

class Token {

    // The "isValid" method checks if the token is valid by decoding it and verifying the "iss" (issuer) claim against specific endpoints, "/api/auth/login" or "/api/auth/signup."
    isValid (token) {
        const payload = this.payload(token)

        if (payload) {
            return payload.iss = "http://127.0.0.1:8000/api/auth/login" || "http://127.0.0.1:8000/api/auth/signup" ? true : false
        }

        return false
    }

    // This method decodes the token and returns the payload as a JSON object.
    payload (token) {
        const payload = token.split('.')[1]
        
        return this.decode(payload)
    }

    // This method decodes the token's payload using Base64 decoding and returns the parsed JSON.
    decode (payload) {
        return JSON.parse(atob(payload))
    }

}

export default Token = new Token();