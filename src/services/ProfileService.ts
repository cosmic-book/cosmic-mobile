import { ProfileInfos } from '@/@types'
import service from './service'

export default class ProfileService {
  static async getByUser(user_id: number): Promise<ProfileInfos> {
    return service.get(`/profile/${user_id}`)
  }
}
