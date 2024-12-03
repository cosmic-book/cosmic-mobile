import History from './History'
import Reading from './Reading'

type ProfileInfos = {
  allReadings: Reading[]
  filteredReadings: Reading[]
  totalReadPages: number
  totalReviews: number
  totalItems: number
  favorites: Reading[]
  lastHistory: History
}

export default ProfileInfos
