interface IPetUpsert {
  id: number
  name: string
  dateOfBirth: Date | null
  animalId: number
  breedId: number
}

export default IPetUpsert
