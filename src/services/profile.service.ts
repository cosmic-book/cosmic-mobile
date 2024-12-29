import { TProfileInfos } from '@/@types'
import service from './service'
import { TBookshelfFilter } from '@/@types/filters'

export class ProfileService {
  static async getByUser(user_id: number, filters?: TBookshelfFilter): Promise<TProfileInfos> {
    return service.get(
      `/profile/${user_id}?category=${filters?.category}&status=${filters?.status}&type=${filters?.type}&rating=${filters?.rating}`
    )
  }
}
