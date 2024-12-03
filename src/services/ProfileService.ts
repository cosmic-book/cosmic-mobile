import { ProfileInfos } from '@/@types'
import service from './service'
import { BookshelfFilter } from '@/@types/filters'

export default class ProfileService {
  static async getByUser(user_id: number, filters?: BookshelfFilter): Promise<ProfileInfos> {
    return service.get(
      `/profile/${user_id}?category=${filters?.category}&status=${filters?.status}&type=${filters?.type}&rating=${filters?.rating}`
    )
  }
}
