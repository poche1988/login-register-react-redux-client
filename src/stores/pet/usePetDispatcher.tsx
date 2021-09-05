import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import IPetModel from '../../models/pets/IPetModel'
import { SET_PETS, DELETE_PET, ADD_PET, EDIT_PET } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePetDispatcher = () => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => ({
      SetPets(pets: IPetModel[]) {
        dispatch({ type: SET_PETS, payload: pets })
      },

      DeletePet(id: number) {
        dispatch({ type: DELETE_PET, payload: id })
      },

      Addpet(pet: IPetModel) {
        dispatch({ type: ADD_PET, payload: pet })
      },

      Editpet(pet: IPetModel) {
        dispatch({ type: EDIT_PET, payload: pet })
      },
    }),
    [dispatch],
  )
  return actions
}

export default usePetDispatcher
