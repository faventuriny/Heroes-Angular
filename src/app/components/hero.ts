export interface Hero {
  id?: number
  name: string
  ability: string
  dateStarted: Date
  suitColor: string
  startingPower: number
  currentPower: number
  howManyTimesTrainedToday?: number
  trainerID: string
}
