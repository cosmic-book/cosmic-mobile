import { API_PATH } from '@env'
import axios from 'axios'
import Toast from 'react-native-toast-message'

const instance = axios.create({
  baseURL: API_PATH
})

export default class Service {
  static setAuthToken(token: string | null): void {
    instance.defaults.headers.Authorization = token ? `Bearer ${token}` : null
  }

  static async get(url: string, params = {}, options = {}): Promise<any> {
    try {
      const response = await instance.get(url, {
        params,
        ...options
      })

      return response.data
    } catch (err: any) {
      this.handleError(err)
    }
  }

  static async post(url: string, data: object): Promise<any> {
    try {
      const response = await instance.post(url, data)

      return response.data
    } catch (err: any) {
      this.handleError(err)
    }
  }

  static async put(url: string, data: object): Promise<any> {
    try {
      const response = await instance.put(url, data)

      return response.data
    } catch (err: any) {
      this.handleError(err)
    }
  }

  static async delete(url: string): Promise<any> {
    try {
      const { data } = await instance.delete(url)

      if (data) {
        Toast.show({ type: 'success', text1: 'Item excluído', text2: data.message })
      }

      return data
    } catch (err: any) {
      this.handleError(err)
    }
  }

  private static handleError(err: any): void {
    const response = err.response

    if (response) {
      const status = response.status

      let type = 'error'
      let text1 = 'Um erro interno aconteceu'

      if (status >= 400 && status < 500) {
        type = 'warning'
        text1 = 'Algo de errado aconteceu'
      }

      console.log('Error:', response.data)

      Toast.show({ type, text1, text2: response.data.message })
    }
  }
}
