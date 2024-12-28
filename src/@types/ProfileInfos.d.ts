import { THistory } from './History'
import { TReading } from './Reading'

export type TProfileInfos = {
  allReadings: TReading[]
  filteredReadings: TReading[]
  totalReadPages: number
  totalReviews: number
  totalItems: number
  favorites: TReading[]
  lastHistory: THistory
}
