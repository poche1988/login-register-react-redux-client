import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Button, Item, Segment } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores/index'
import usePetDispatcher from '../../../stores/pet/usePetDispatcher'
import petRepository from '../../../app/api/repositories/petRepository'
import { LoadingComponent } from '../shared/LoadingComponent'
import { Link } from 'react-router-dom'

interface IProps {
  submitting: boolean
  setSubmitting: (set: boolean) => void
}

export const PetList = ({ submitting, setSubmitting }: IProps): JSX.Element => {
  const { SetPets, DeletePet } = usePetDispatcher()
  const [loading, setLoading] = useState(true)
  const pets = useSelector((state: RootState) => state.pets.pets)
  const [target, setTarget] = useState('')

  useEffect(() => {
    petRepository
      .list()
      .then((response) => {
        SetPets(response)
      })
      .then(() => setLoading(false))
  }, [])

  const handleDeletePet = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number,
  ) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    petRepository
      .delete(id)
      .then(() => {
        DeletePet(id)
      })
      .then(() => setSubmitting(false))
  }

  return loading ? (
    <LoadingComponent content="Loading..." inverted={true} />
  ) : (
    <Segment clearing>
      <Item.Group divided>
        {pets.map((pet) => (
          <Item key={pet.id}>
            <Item.Content>
              <Item.Header as="a">{pet.name}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/Pets/${pet.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={`Pet${pet.id}`}
                  loading={target === `Pet${pet.id}` && submitting}
                  onClick={(e) => handleDeletePet(e, pet.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
