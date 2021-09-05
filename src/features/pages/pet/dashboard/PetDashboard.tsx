import React, { useState } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { PetList } from '../../../components/pet/PetList'
import { Link } from 'react-router-dom'

export const PetDashboard = (): JSX.Element => {
  const [submitting, setSubmitting] = useState(false)

  return (
    <Grid>
      <Grid.Column width={10}>
        <Button as={Link} to={`/Pet/Create`} positive content="Create Pet" />
        <PetList setSubmitting={setSubmitting} submitting={submitting} />
      </Grid.Column>
    </Grid>
  )
}
