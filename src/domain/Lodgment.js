import moment from 'moment'

class Lodgment {
  constructor(
    id,
    owner,
    name,
    description,
    baseCost,
    capacity,
    bedrooms,
    bathrooms,
    accommodationDetail,
    otherAspects,
    cleaningService,
    address,
    country,
    imageUrl,
    type,
    reserves,
    rate = [],
    rateAverage,
    rateCount,
    commission,
    valid
  ) {
    this.type = type
    this.owner = owner
    this.baseCost = baseCost
    this.name = name
    this.description = description
    this.capacity = capacity
    this.bedrooms = bedrooms
    this.bathrooms = bathrooms
    this.accommodationDetail = accommodationDetail
    this.otherAspects = otherAspects
    this.cleaningService = cleaningService
    this.address = address
    this.country = country
    this.imageUrl = imageUrl
    this.id = id
    this.rate = rate
    this.rateAverage = rateAverage
    this.rateCount = rateCount
    this.commission = commission
    this.reserves = reserves
    this.valid = valid
  }

  plus() {}

  totalCost() {
    return Math.round((this.baseCost + this.plus()) * this.commission)
  }

  addReserve(reservation) {
    this.reserves.push(reservation)
  }

  static fromJSON(lodgmentJSON) {
    switch (lodgmentJSON.type) {
      case 'Cabin':
        return Object.assign(new Cabin(), lodgmentJSON)

      case 'House':
        return Object.assign(new House(), lodgmentJSON)

      case 'Department':
        return Object.assign(new Department(), lodgmentJSON)
    }
  }

  totalCostWithDates(dateFrom, dateTo) {
    let total = moment(dateTo).diff(moment(dateFrom), 'days') * this.totalCost()
    return total > 0 ? total : null
  }

  addScore(score, commentary, user) {}

  averageScore() {
    return (
      this.rateScores.reduce((sumOf, rate) => sumOf + rate, 0) /
        this.rateScores.length || 0
    )
  }

  scoresCount() {
    return this.rate.length
  }

  static fromJSON(lodgmentJSON) {
    switch (lodgmentJSON.type) {
      case 'Cabin':
        return Object.assign(new Cabin(), lodgmentJSON)

      case 'House':
        return Object.assign(new House(), lodgmentJSON)

      case 'Department':
        return Object.assign(new Department(), lodgmentJSON)

      default:
        console.log('NO ENTRA')
    }
  }
}

class Cabin extends Lodgment {
  plus() {
    return this.cleaningService ? 10000 : 0
  }
}

class House extends Lodgment {
  plus() {
    return this.capacity * 500
  }
}

class Department extends Lodgment {
  plus() {
    return this.bedrooms < 3 ? 2000 * this.bedrooms : 1000 * this.bedrooms
  }
}

export { Lodgment, House, Department, Cabin }
