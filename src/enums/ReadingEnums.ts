enum ReadingStatus {
  TO_READ = 'Quero Ler',
  READING = 'Lendo',
  FINISHED = 'Concluído',
  REREADING = 'Relendo',
  ABANDONED = 'Abandonado'
}

enum ReadingCategory {
  BOOK = 'Livro',
  COMIC = 'Quadrinho',
  MAGAZINE = 'Revista'
}

enum ReadingType {
  PRINTED = 'Impresso',
  DIGITAL = 'Digital',
  AUDIO = 'Áudio'
}

export { ReadingCategory, ReadingStatus, ReadingType }
