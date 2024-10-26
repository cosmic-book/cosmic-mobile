import { User } from '@/@types'

interface IAuthResponse {
  token: string
  exp: string
  user: User
}

export default IAuthResponse
