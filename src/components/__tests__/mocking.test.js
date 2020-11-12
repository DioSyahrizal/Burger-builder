import axios from 'axios'
jest.mock('axios')

const url = 'https://burger-builder-2c373.firebaseio.com/ingredients.json'

const fetchData = async () => {
   return await axios.get(url)
}

describe('Mocking API', () => {
   it('call ingredients api', async () => {
      const data = {
         bacon: 0,
         cheese: 0,
         meat: 1,
         salad: 0,
      }

      axios.get.mockImplementationOnce(() => Promise.resolve(data))
      await expect(fetchData()).resolves.toEqual(data)
   })

   it('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error'

      axios.get.mockImplementationOnce(() =>
         Promise.reject(new Error(errorMessage))
      )
      await expect(fetchData()).rejects.toThrow(errorMessage)
   })
})
