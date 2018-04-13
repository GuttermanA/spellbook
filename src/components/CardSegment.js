import React from 'react'
import { Segment } from 'semantic-ui-react'


const CardSegment = (props) => {
  const { cardCount, name } = props.card
  return (

    <Segment>{`${cardCount} ${name}`}</Segment>
  )
}

export default CardSegment
