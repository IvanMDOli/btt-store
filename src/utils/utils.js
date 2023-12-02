import { MOCK_DATA } from "../mock/data"

export const pedirDatos = (bool) => {
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