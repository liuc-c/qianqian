export interface Answer {
  operation: any
  sort: any
  correct: boolean
  choiceId: string
  mark: string
  resultId: any
  choiceAnswer: any
}
export interface Topic {
  topic: string
  linkNo: number
  choiceAnswers: Answer[]
  keyword4Code: any
  answerAnalyse: string
  keyword2Code: any
  questionId: string
  no: number
  keyword1Code: any
  typeCode: string
  keyword3Code: any
  favorite: string
  mainType: string
  qSort: string
  rightResult: string
  bankId: any
  bankCode: any
  record: any
  is_written: string
  createTimeStr: any
  isWritten: any
  correct: string
  favoriteId: string
  mainId: string
  answerResult: any
  mainTopic: string
}
