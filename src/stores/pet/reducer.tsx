import PetState from './state'
import {
  SET_PETS,
  ADD_PET,
  EDIT_PET,
  DELETE_PET,
  PetActionTypes,
} from './types'

const initialState: PetState = {
  pets: [],
  selectedPet: null,
}

const petReducer = (state = initialState, action: PetActionTypes): PetState => {
  switch (action.type) {
    case SET_PETS:
      return {
        ...state,
        pets: action.payload,
      }
    case ADD_PET:
      return {
        ...state,
        pets: [...state.pets, action.payload],
      }
    case EDIT_PET:
      return {
        ...state,
        pets: [
          ...state.pets.filter((a) => a.id !== action.payload.id),
          action.payload,
        ],
      }
    case DELETE_PET:
      return {
        ...state,
        pets: state.pets.filter((a) => a.id !== action.payload),
      }
    default:
      return state
  }
}

export default petReducer
