import React, { Component } from 'react'
import uuid from 'uuid'
import CardSegment from './CardSegment'
import DeckCardInput from './DeckCardInput'
import { capitalizeFirstLetter } from '../globalFunctions'
import { Segment, Header, Label } from 'semantic-ui-react'


class SegmentList extends Component {

  state ={
    cards: this.props.cards
  }


  addInput = () => {
    this.setState({
      cards: [...this.state.cards, { key:uuid(), name:"", count:"", sideboard: this.props.board === 'sideboard' ? true : false}]
    })
  }

  handleRemove = (event, cardRef) => {
    this.props.handleRemoveEdit(event, cardRef)
    this.setState({
      cards:  this.state.cards.filter(card => card.key !== cardRef.key)
    })
  }

  render() {
    const {
      type,
      board,
      editing,
      // totalsideboard
    } = this.props
    let cardSegments
    if (editing) {
      cardSegments = this.state.cards.map(card => {
        return (
          <DeckCardInput
            removeInput={this.props.removeInput}
            handleRemove={this.handleRemove}
            handleChange={this.props.handleChange}
            key={card.key}
            editing={editing}
            card={card}
          />
        )
      })
    } else {
      cardSegments = this.props.cards.map(card => <CardSegment key={uuid()} card={card} board={board}/>)
    }

    return (

      <Segment.Group className="deck-list-group" compact >
        { this.props.editing && (
          <Label as='a' onClick={this.addInput} attached='top'>
            Add
          </Label>
        )}
          {type && <Segment as={Header} >
            {
               `${capitalizeFirstLetter(this.props.type)}`
              // type ? `${capitalizeFirstLetter(this.props.type)}`: `Sideboard (${!totalsideboard ? 0 : totalsideboard})`
            }
          </Segment>}

        {cardSegments}
      </Segment.Group>
    )
  }


}

export default SegmentList

// { type && (
//   <Segment as={Header}>
//     {capitalizeFirstLetter(this.props.type)}
//   </Segment>
// )}
