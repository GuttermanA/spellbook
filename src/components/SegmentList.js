import React, { Component } from 'react'
import uuid from 'uuid'
import CardSegment from './CardSegment'
import DeckCardInput from './DeckCardInput'
import { capitalizeFirstLetter } from '../globalFunctions'
import { Segment, Header, Label, Icon } from 'semantic-ui-react'


class SegmentList extends Component {

  state ={
    cards: this.props.cards
  }


  addInput = () => {
    this.setState({
      cards: [...this.state.cards, { key:uuid(), name:"", count:"", sideboard: this.props.type === 'sideboard' ? true : false}]
    })
  }

  handleRemove = (event, cardRef) => {
    this.props.handleRemoveEdit(event, cardRef)
    this.setState({
      cards:  this.state.cards.filter(card => card.key !== cardRef.key)
    })
  }
  // const cards = this.props.cards.map(card => <CardSegment key={uuid()} editing={this.props.editing} card={card} />)

  render() {
    const cardSegments = this.state.cards.map(card => <DeckCardInput handleRemove={this.handleRemove} handleChange={this.props.handleChange} key={card.key} editing={this.props.editing} card={card} />)
    return (

      <Segment.Group style={{width: '220px'}} compact>
        <Segment as={Header}>
          { this.props.editing && (
            <Label as='a' onClick={this.addInput} floating>
              Add
            </Label>
          )}
          {capitalizeFirstLetter(this.props.type)}
        </Segment>
        {cardSegments}
      </Segment.Group>
    )
  }


}

export default SegmentList
