import {
  SET_PETS,
  ADD_PET,
  EDIT_PET,
  DELETE_PET,
  PetActionTypes,
} from './types'
import IPetModel from '../../models/pets/IPetModel'

export function setPets(pets: IPetModel[]): PetActionTypes {
  return {
    type: SET_PETS,
    payload: pets,
  }
}

export function addPet(pet: IPetModel): PetActionTypes {
  return {
    type: ADD_PET,
    payload: pet,
  }
}

export function editPet(pet: IPetModel): PetActionTypes {
  return {
    type: EDIT_PET,
    payload: pet,
  }
}

export function deletePet(petId: number): PetActionTypes {
  return {
    type: DELETE_PET,
    payload: petId,
  }
}
