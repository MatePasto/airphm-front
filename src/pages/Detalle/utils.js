import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { dayjs } from 'dayjs';

const moment = extendMoment(Moment);

export const isReservedDate = (date, lodgmentReserves, userReserves) => {
    const joinedReserves = lodgmentReserves.concat(userReserves)
    console.log("USUARIO",userReserves);
    console.log(joinedReserves);
    if(userReserves) {
        const reserveDates = joinedReserves.map( reserve => moment.range(moment(reserve.startDate), moment(reserve.endDate)) )
        console.log('RESERVADAS',reserveDates);
        return reserveDates.some(reserve => {
            return reserve.contains(date)
        })
    }
    return false
}
