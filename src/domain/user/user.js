export class User {
    constructor(
        id,
        name,
        surname,
        countryOfResidence,
        balance,
        birthDate,
        reserves,
        friends,
        lodgments,
        email
    ) {
        this.id = id
        this.name = name
        this.surname = surname
        this.countryOfResidence = countryOfResidence
        this.balance = balance
        this.birthDate = birthDate
        this.reserves = reserves
        this.friends = friends
        this.lodgments = lodgments
        this.email = email
    }

    toJson = () => {
        return new UserDTO(this)
    }

    addReserve(reservation) {
        this.reserves.push(reservation)
    }
}

export class UserDTO {
    id
    name
    surname
    countryOfResidence
    balance
    birthDate
    reserves
    friends
    lodgments
    email

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.surname = data.surname
        this.countryOfResidence = data.countryOfResidence
        this.balance = data.Balance
        this.birthDate = data.birthDate
        this.reserves = data.reserves
        this.friends = data.friends
        this.lodgments = data.lodgments
        this.email = data.email
    }
}