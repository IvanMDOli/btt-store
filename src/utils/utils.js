import { MOCK_DATA } from "../mock/data"

export const getItem = (bool) => {
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if (bool === true){
          resolve(MOCK_DATA)
        }
        else {
          reject("Promesa rechazada")
        }
      }, 2000)
    })
}

export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});