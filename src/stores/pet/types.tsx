import IPetModel from '../../models/pets/IPetModel'

export const SET_PETS = 'SET_PETS'
export const ADD_PET = 'ADD_PET'
export const EDIT_PET = 'EDIT_PET'
export const DELETE_PET = 'DELETE_PET'

interface SetPetsAction {
  type: typeof SET_PETS
  payload: IPetModel[]
}

interface AddPetAction {
  type: typeof ADD_PET
  payload: IPetModel
}

interface EditAction {
  type: typeof EDIT_PET
  payload: IPetModel
}

interface DeletePetAction {
  type: typeof DELETE_PET
  payload: number
}

export type PetActionTypes =
  | SetPetsAction
  | AddPetAction
  | EditAction
  | DeletePetAction
