import { Lodgment } from "../domain/Lodgment";
import { RateData } from './../domain/RateData';


//RATE_DATA
const rate1 = new RateData(4.2, 'Linda vista y grandes espacios', 'Adan')
const rate2 = new RateData(4.5, 'Linda vista, amplia cocina', 'Jesus')

const rates = [
    rate1,
    rate2
]

//LODGMENT_DATA

export const lodgment1 = JSON.stringify(new Lodgment(1, 'adan', 2300, 'Casa en Villa Urquiza', 'Acogedora casa de 2 habitaciones', 3, 2, 2, 'Av. Siempre Viva 3345', 'Argentina', 'ajsjdj kakias lanckas keakskkdkaskksakd kaskdaksd js jadsl', 'pimpimpimpim ponponponpon pmm', true, rates, 'house', 1.05,))
export const logdments = [
    lodgment1
]



export function getById(id) {
    return logdments.filter( l => l.id !== id)
}