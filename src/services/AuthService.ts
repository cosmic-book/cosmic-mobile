import { TUser } from '@/@types'
import { IAuthResponse } from '@/interfaces'
import service from './service'

export default class AuthService {
  static async login(username: string, password: string): Promise<IAuthResponse | undefined> {
    const loginData: Partial<TUser> = {
      username,
      password
    }

    const data: IAuthResponse = await service.post('/auth/login', loginData)

    return data
  }
}
