import moment from 'moment-mini'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'
import IPetModel from '../../../../models/pets/IPetModel'
import { RootState } from '../../../../stores'
import petRepository from '../../../../app/api/repositories/petRepository'

interface MatchParams {
  id: string
}

const Details = ({
  match,
  history,
}: RouteComponentProps<MatchParams>): JSX.Element => {
  const [pet, setPet] = useState<IPetModel>({
    id: 0,
    name: '',
    dateOfBirth: '',
    breed: '',
    animal: '',
  })

  const petInState: IPetModel | undefined = useSelector((state: RootState) =>
    state.pets.pets.find((a) => a.id === parseInt(match.params.id)),
  )

  useEffect(() => {
    if (!petInState) {
      petRepository
        .details(parseInt(match.params.id))
        .then((response) => setPet(response))
    } else setPet(petInState)
  }, [])

  return (
    <Card fluid>
      <Image src="/assets/dogplaceholder.jpg" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{pet?.name}</Card.Header>
        <Card.Description>
          Date of Birth: {moment(pet?.dateOfBirth).format('DD-MMM-YYYY')}
        </Card.Description>
        <Card.Description>{`${pet?.animal} - ${pet?.breed}`}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/Pet/Edit/${pet?.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push(`/Pets`)}
            basic
            color="grey"
            content="cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default Details
