import React from 'react'
import { Segment } from 'semantic-ui-react'


const CardSegment = (props) => {
  const { card_count, name } = props.card
  return (

    <Segment>{`${card_count} ${name}`}</Segment>
  )
}

export default CardSegment
