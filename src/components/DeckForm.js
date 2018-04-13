import React, { Component} from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Form, Button, Container, Segment, Dropdown, Message, Checkbox } from 'semantic-ui-react'
import { createDeck } from '../actions/decks'
import { withRouter } from 'react-router-dom'
import {  archtypeOptions } from '../globalVars'

class DeckForm extends Component {
  state = {
    fields: {
      name: "",
      archtype: "",
      format: "",
      tournament: false,
      cards: {
        mainboard: [{key:uuid(), name:"", number:"", error: false}],
        sideboard: [{key:uuid(), name:"", number:"", error: false}],
      },
    },
    text: false,
    validation: {
      error: false,
      message: "",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.selectedCard).length && (nextProps.selectedCard.type === 'mainboard' || nextProps.selectedCard.type === 'sideboard')) {
      this.addCard(nextProps.selectedCard)
    }

    if (nextProps.deckError) {
      const mainboardCopy = this.state.fields.cards.mainboard.map(card => {
        if (nextProps.deckErrorRes.keys.mainboard.includes(card.key) ) {
          card.error = true
        }
        return card
      })
      const sideboardCopy = this.state.fields.cards.sideboard.map(card => {
        if (nextProps.deckErrorRes.keys.sideboard.includes(card.key) ) {
          card.error = true
        }
        return card
      })

      this.setState({
        validation: {
          error: true,
          message: nextProps.deckErrorRes.message
        },
        fields: {
          ...this.state.fields,
          cards: {
            mainboard: mainboardCopy,
            sideboard: sideboardCopy
          }
        }
      },()=> console.log(this.state.fields.cards))
    }
  }

  addCard = (addedCard) => {
    const board = this.state.fields.cards[addedCard.type]
    let updated = false
    const newCards = board.map((stateCard, index) => {
      const names = board.map(card => card.name)
      if (stateCard.name.toLowerCase() === addedCard.attributes.name.toLowerCase()) {
        ++stateCard.number
        updated = true
        return stateCard
      } else if (!stateCard.name && !names.includes(addedCard.attributes.name)) {
        updated = true
        stateCard.name = addedCard.attributes.name
        stateCard.number = 1
        return stateCard
      }

      return stateCard
    })

    if (!updated) {
      newCards.push({key:uuid(),name: addedCard.attributes.name, number: 1, error: false})
    }

    this.setState({
      fields: {
        ...this.state.fields,
        cards: {
          ...this.state.fields.cards,
          [addedCard.type]: newCards
        }
      }
    })
  }

  appendInput = (event, { name }) => {
    event.preventDefault()
    let cards = this.state.fields.cards[name]
    if (cards.length <= 100) {
      this.setState({
        fields: {
          ...this.state.fields,
          cards: {
            ...this.state.fields.cards,
            [name]: [...cards, {key: uuid(), name:'', number:'', error: false}],
          }
        }
      })
    } else {
      alert("Max cards reached")
    }
  }

  handleChange = (event, { name, value, checked }) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: checked ? checked : value,
      },
    })
  }

  handleCardChange = (event) => {
    const { name, id, value } = event.target
    const position = event.target.dataset.position
    const copy = this.state.fields.cards[id].map((card, index) => {
      if (index === parseInt(position, 10)) {
        card[name] = value
      }
      return card
    })
    this.setState({
      fields: {
        ...this.state.fields,
        cards: {
          ...this.state.fields.cards,
          [id]: copy
        }
      }
    },()=> console.log(this.state.fields.cards))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, format } = this.state.fields
    if (name && format) {
      this.props.createDeck(this.state.fields, this.props.history)
    } else {
      const message = `Name and format required for submission `
      this.setState({validation: { error: true, message }})
    }

  }

  render() {
    const mainboard = this.state.fields.cards.mainboard.map((input, index) => {
      return (
        <Form.Group key={input.key}>
          <Form.Field className='name-input'  error={input.error}>
            <input type='text' placeholder='Card name' value={input.name} name='name' id='mainboard' data-position={index} onChange={this.handleCardChange}/>
          </Form.Field>
          <Form.Field className='number-input' >
            <input type='number' placeholder='Num'  value={input.number} name='number' id='mainboard' data-position={index} onChange={this.handleCardChange}/>
          </Form.Field>
        </Form.Group>
      )
    })
    const sideboard = this.state.fields.cards.sideboard.map((input, index) => {
      return (
        <Form.Group key={input.key}>
          <Form.Field className='name-input' error={input.error}>
            <input type='text' placeholder='Card name' value={input.name} name='name' data-position={index} id='sideboard' onChange={this.handleCardChange}/>
          </Form.Field>
          <Form.Field className='number-input' >
            <input type='number' placeholder='Num'  value={input.number} name='number' data-position={index} id='sideboard' onChange={this.handleCardChange}/>
          </Form.Field>
        </Form.Group>
      )
    })
    const { error, message } = this.state.validation
    const { name, archtype, format} = this.state.fields
    const { formats } = this.props
    return (
      <Container as={Segment} textAlign='left'>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input required inline type='text' label='Deck Name' value={name} name='name' onChange={this.handleChange}/>
          <Form.Field required inline>
            <label>Format</label>
            <Dropdown
              onChange={this.handleChange}
              options={formats}
              placeholder='Search format'
              search
              selection
              value={format}
              name='format'
            />
          </Form.Field>
          <Form.Field inline>
            <label>Archtype</label>
            <Dropdown
              onChange={this.handleChange}
              options={archtypeOptions}
              placeholder='Choose archtype'
              selection
              value={archtype}
              name='archtype'
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Tournament' onChange={this.handleChange} name='tournament'/>
          </Form.Field>
          <Form.Field>
            <label>Mainboard</label>
          </Form.Field>
          {mainboard}
          <Button onClick={this.appendInput} name='mainboard'>Add Card</Button>
          <Form.Field>
            <label>Sideboard</label>
          </Form.Field>
          {sideboard}
          <Button onClick={this.appendInput} name='sideboard'>Add Card</Button>
          <Form.Button>Finalize</Form.Button>
        </Form>
        <Message warning attached hidden={ error === false}>
          <Message.Header>{message}</Message.Header>
        </Message>
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

export default connect(mapStateToProps, { createDeck })(withRouter(DeckForm))
