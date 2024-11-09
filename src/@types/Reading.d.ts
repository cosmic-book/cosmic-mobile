import { ItemType, OwnershipStatus, ReadingStatus } from '@/enums'

type Reading = {
  id: number
  id_user: number
  id_book: number
  status: number
  type: number
  category: number
  readPages?: number
  rating?: number
  review?: string
  like?: boolean
  start_date?: string | null
  finish_date?: string | null
}

export default Reading
