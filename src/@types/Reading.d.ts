import { ItemType, OwnershipStatus, ReadingStatus } from '@/enums'
import Book from './Book'

type Reading = {
  id: number
  id_user: number
  id_book: number
  status: number | null
  type: number
  category: number
  read_pages?: number | null
  rating?: number | null
  review?: string | null
  like?: boolean
  start_date?: string | null
  finish_date?: string | null
  book?: Book
}

export default Reading
