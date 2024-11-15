import { ItemType, OwnershipStatus, ReadingStatus } from '@/enums'
import Book from './Book'

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
  book?: Book
}

export default Reading
