import Reading from './Reading'

type History = {
  id: number
  id_reading: number
  date: string | null
  read_pages: number
  comment?: string
  reading?: Reading
}

export default History
