import { TUser } from '@/@types'

export interface IAuthResponse {
  token: string
  exp: string
  user: TUser
}
