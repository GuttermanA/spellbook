import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'


const CardSegment = (props) => {
  const { count, name } = props.card
  return (

    <Segment>{`${count} ${name}`}</Segment>
  )
}

export default CardSegment
