import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoadingComponent = (props: {
  inverted?: boolean
  content?: string
}): JSX.Element => {
  return (
    <Dimmer active inverted={props.inverted}>
      <Loader content={props.content} />
    </Dimmer>
  )
}
