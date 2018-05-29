import React, { Component} from 'react'
import uuid from 'uuid'
import DeckCardInput from './DeckCardInput'
import { connect } from 'react-redux'
import { sortCardsIntoBoards } from '../globalFunctions'
import { Form, Button, Container, Segment, Dropdown, Message, Checkbox, Divider } from 'semantic-ui-react'
import { createDeck } from '../actions/decks'
import { clearCard } from '../actions/cards'
import { withRouter } from 'react-router-dom'
import {  archtypeOptions } from '../globalVars'


const addCard = (newCard, prevState) => {
  const cards = prevState.fields.cards
  let updated = false

  // let nextCardsState = []
  for(let i = 0; i < cards.length; i++) {
    let card = cards[i]

    if ((card.name.toLowerCase() === newCard.attributes.name.toLowerCase()) && (card.sideboard === newCard.sideboard)) {
      ++card.count
      updated = true
      break
    }
  }
  // const newCards = cards.forEach((card, index) => {
  //   // const names = cards.map(card => card.name)
  //   if ((card.name.toLowerCase() === newCard.attributes.name.toLowerCase()) && (card.sideboard === newCard.attributes.sideboard)) {
  //     ++card.count
  //     updated = true
  //     break
  //   }
  //   // else if (!card.name && !names.includes(newCard.attributes.name)) {
  //   //   updated = true
  //   //   card = {...newCard.attributes, count: 1}
  //   //   break
  //   // }
  // })

  if (!updated) {
    for(let i = 0; i < cards.length; i++) {
      let card = cards[i]

      if (!card.name) {
        cards[i] = {key:uuid(), error: false, sideboard: newCard.sideboard, ...newCard.attributes, count: 1}
        updated = true
        break
      }
    }
    if (!updated) {
      cards.push({key:uuid(), error: false, sideboard: newCard.sideboard, ...newCard.attributes, count: 1})
    }

  }

  return cards
}

class DeckForm extends Component {
  state = {
    fields: {
      name: "",
      archtype: "",
      formatName: "",
      tournament: false,
      cards: []
    },
    validation: {
      error: false,
      message: "",
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {

    if (Object.keys(nextProps.selectedCard).length ) {
      return {
        fields: {
          ...prevState.fields,
          cards: addCard(nextProps.selectedCard, prevState)
        }
      }
    }

    if (nextProps.deckError) {
      const cards = prevState.fields.cards
      const cardsCopy = cards.map(card => {
        if (nextProps.deckErrorRes.keys.includes(card.key) ) {
          card.error = true
        }
        return card
      })

      return {
        validation: {
          error: true,
          message: nextProps.deckErrorRes.message
        },
        fields: {
          ...prevState.fields,
          cards: cardsCopy
        }
      }
    }

    return null


  }

  // componentWillReceiveProps(nextProps) {
  //   if (Object.keys(nextProps.selectedCard).length && (nextProps.selectedCard.type === 'mainboard' || nextProps.selectedCard.type === 'sideboard')) {
  //     this.addCard(nextProps.selectedCard)
  //   }
  //
  //   if (nextProps.deckError) {
  //     const mainboardCopy = this.state.fields.cards.mainboard.map(card => {
  //       if (nextProps.deckErrorRes.keys.mainboard.includes(card.key) ) {
  //         card.error = true
  //       }
  //       return card
  //     })
  //     const sideboardCopy = this.state.fields.cards.sideboard.map(card => {
  //       if (nextProps.deckErrorRes.keys.sideboard.includes(card.key) ) {
  //         card.error = true
  //       }
  //       return card
  //     })
  //
  //     this.setState({
  //       validation: {
  //         error: true,
  //         message: nextProps.deckErrorRes.message
  //       },
  //       fields: {
  //         ...this.state.fields,
  //         cards: {
  //           mainboard: mainboardCopy,
  //           sideboard: sideboardCopy
  //         }
  //       }
  //     },()=> console.log(this.state.fields.cards))
  //   }
  // }

  // addCard = (addedCard) => {
  //   const board = this.state.fields.cards[addedCard.type]
  //   let updated = false
  //   const newCards = board.map((stateCard, index) => {
  //     const names = board.map(card => card.name)
  //     if (stateCard.name.toLowerCase() === addedCard.attributes.name.toLowerCase()) {
  //       ++stateCard.count
  //       updated = true
  //       return stateCard
  //     } else if (!stateCard.name && !names.includes(addedCard.attributes.name)) {
  //       updated = true
  //       stateCard = {...addedCard.attributes, count: 1}
  //       return stateCard
  //     }
  //
  //     return stateCard
  //   })
  //
  //   if (!updated) {
  //     newCards.push({key:uuid(), error: false, info:{...addedCard.attributes, count: 1}})
  //   }
  //
  //   return newCards
  //
  //   this.setState({
  //     fields: {
  //       ...this.state.fields,
  //       cards: {
  //         ...this.state.fields.cards,
  //         [addedCard.type]: newCards
  //       }
  //     }
  //   })
  // }

  appendInput = (event, { name }) => {
    event.preventDefault()
    const sideboard = name === 'sideboard'
    const cards = this.state.fields.cards
    if (cards.length <= 100) {
      this.setState({
        fields: {
          ...this.state.fields,
          cards: [...cards, {key:uuid(), error: false, sideboard, name:"", count: "" }],
        }
      })
    } else {
      alert("Max cards reached")
    }
  }

  removeInput = (event, { id, name }) => {
    event.preventDefault()
    if (Object.keys(this.props.selectedCard).length) {
        this.props.clearCard()
    }

    const updatedCards = this.state.fields.cards.filter(card => card.key !== id)
    this.setState({
      fields: {
        ...this.state.fields,
        cards: updatedCards
      }
    })
  }

  // removeInput = (event, { id, name }) => {
  //   event.preventDefault()
  //   this.setState({
  //     fields: {
  //       ...this.state.fields,
  //       cards: {
  //         ...this.state.fields.cards,
  //         [id]: this.state.fields.cards[id].filter((input, index) => index !== parseInt(name, 10))
  //       }
  //     }
  //   })
  // }

  handleFieldChange = (event, { name, value, checked }) => {
    if (Object.keys(this.props.selectedCard).length) {
        this.props.clearCard()
    }
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: checked ? checked : value,
      },
    })
  }

  handleCardChange = (event, { name, id, value }) => {
    if (Object.keys(this.props.selectedCard).length) {
        this.props.clearCard()
    }


    // const { name, id, value } = event.target
    // const position = event.target.dataset.position

    const updatedCards = this.state.fields.cards.map((card) => {
      if (card.key === id) {
        card[name] = value
      }
      return card
    })
    this.setState({
      fields: {
        ...this.state.fields,
        cards: updatedCards
      }
    },()=> console.log(this.state.fields.cards))
  }

  // handleCardChange = (event) => {
  //   const { name, id, value } = event.target
  //   const position = event.target.dataset.position
  //   const copy = this.state.fields.cards[id].map((card, index) => {
  //     if (index === parseInt(position, 10)) {
  //       card[name] = value
  //     }
  //     return card
  //   })
  //   this.setState({
  //     fields: {
  //       ...this.state.fields,
  //       cards: {
  //         ...this.state.fields.cards,
  //         [id]: copy
  //       }
  //     }
  //   },()=> console.log(this.state.fields.cards))
  // }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, formatName } = this.state.fields
    debugger
    if (name && formatName) {
      this.props.createDeck(this.state.fields, this.props.history)
      // this.setState({
      //   fields: {
      //     name: "",
      //     archtype: "",
      //     format: "",
      //     tournament: false,
      //     cards: []
      //   },
      //   validation: {
      //     error: false,
      //     message: "",
      //   }
      // })
    } else {
      const message = `Name and format required for submission`
      this.setState({validation: { error: true, message }})
    }

  }

  render() {
    const { handleCardChange, removeInput } = this
    const { formats } = this.props
    const { error, message } = this.state.validation
    const { name, archtype, tournament, formatName, cards } = this.state.fields
    const mainboard = sortCardsIntoBoards(cards, DeckCardInput, false, {handleCardChange, removeInput})
    const sideboard = sortCardsIntoBoards(cards, DeckCardInput, true, {handleCardChange, removeInput})
    return (
      <Container as={Segment} textAlign='left'>

        <Form onSubmit={this.handleSubmit} error={error}>
          <Form.Input required inline type='text' label='Deck Name' value={name} name='name' onChange={this.handleFieldChange} width={9}/>
          <Form.Field required inline width={8}>
            <label>Format</label>
            <Dropdown
              onChange={this.handleFieldChange}
              options={formats}
              placeholder='Search format'
              search
              selection
              value={formatName}
              name='formatName'
            />
          </Form.Field>
          <Form.Field inline width={8}>
            <label>Archtype</label>
            <Dropdown
              onChange={this.handleFieldChange}
              options={archtypeOptions}
              placeholder='Choose archtype'
              selection
              value={archtype}
              name='archtype'
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Tournament' onChange={this.handleFieldChange} name='tournament' checked={tournament}/>
          </Form.Field>
          <Form.Field>
            <label>Mainboard</label>
          </Form.Field>
          {mainboard}
          <Button  onClick={this.appendInput} name='mainboard'>Add Card</Button>
          <Divider hidden/>
          <Form.Field>
            <label>Sideboard</label>
          </Form.Field>
          {sideboard}
          <Button onClick={this.appendInput} name='sideboard' >Add Card</Button>
          <Divider />
          <Message hidden={!error} error header='Invalid Submission' content={message}/>
          <Form.Button >Submit</Form.Button>
        </Form>

      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    formats: state.decks.formats.map(format => {
      return { key: uuid(), text: format.name, value: format.name }
    }),
    archtypes: state.decks.archtypes,
    userId: state.auth.currentUser.id,
    selectedCard: state.cards.selected,
    deckError: state.decks.errorStatus,
    deckErrorRes: state.decks.error
  }
}

export default connect(mapStateToProps, { createDeck, clearCard })(withRouter(DeckForm))
