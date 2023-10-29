import axios from 'axios'
import PropTypes from 'prop-types'
import { userFromJson } from '../domain/user/userFromJson'
import { REST_SERVER_URL } from "./util"
import { lodgmentService } from './lodgmentService'

class AuthService {
    async logIn(username, password) {
        const user = await axios.get(
            `${REST_SERVER_URL}/api/user/${username}/${password}`
        )
        this.setLoggedUser(username)
        return user
    }

    async getByUsername(username) {
        const user = await axios.get(`${REST_SERVER_URL}/api/user/name/${username}`)
        return user ? userFromJson(user.data) : undefined
    }

    async setUserData(id, user) {
        await axios.put(`${REST_SERVER_URL}/api/user/${id}`, user)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }

    setLoggedUser(username) {
        sessionStorage.setItem('logged', username)
        return true
    }

    logOutUser() {
        sessionStorage.removeItem('logged')
    }

    async getById(id) {
        const user = await axios.get(`${REST_SERVER_URL}/api/user/${id}`)
        return user ? userFromJson(user.data) : undefined
    }

    async createReservation(reservation){

        const username = sessionStorage.getItem('logged')
        const user = await this.getByUsername(username)
        
        reservation.userId = user.id 
        console.log(reservation);

        lodgmentService.saveReserve(reservation)
    }
}

AuthService.propTypes = {
    authenticationResponse: PropTypes.bool,
    loggedUser: PropTypes.object,
}

export const authService = new AuthService()
