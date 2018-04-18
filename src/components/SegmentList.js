import React from 'react'
import uuid from 'uuid'
import CardSegment from './CardSegment'
import DeckCardInput from './DeckCardInput'
import { capitalizeFirstLetter } from '../globalFunctions'
import { Segment, Header } from 'semantic-ui-react'


const SegmentList = (props) => {
  // const cards = props.cards.map(card => <CardSegment key={uuid()} editing={props.editing} card={card} />)
  const cards = props.cards.map(card => <DeckCardInput handleChange={props.handleChange} key={uuid()} editing={props.editing} card={card} />)
  return (

    <Segment.Group style={{width: '220px'}} compact>
      <Segment as={Header} content={capitalizeFirstLetter(props.type)}/>
      {cards}
    </Segment.Group>
  )
}

export default SegmentList
