import IPetModel from '../../models/pets/IPetModel'

export default interface PetState {
  pets: IPetModel[]
  selectedPet: IPetModel | null
}
