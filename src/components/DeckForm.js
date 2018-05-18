import React, { Component} from 'react'
import uuid from 'uuid'
import DeckCardInput from './DeckCardInput'
import { connect } from 'react-redux'
import { Form, Button, Container, Segment, Dropdown, Message, Checkbox, Divider } from 'semantic-ui-react'
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
        mainboard: [{key:uuid(), name:"", count:"", error: false}],
        sideboard: [{key:uuid(), name:"", count:"", error: false}],
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
        ++stateCard.count
        updated = true
        return stateCard
      } else if (!stateCard.name && !names.includes(addedCard.attributes.name)) {
        updated = true
        stateCard.name = addedCard.attributes.name
        stateCard.count = 1
        return stateCard
      }

      return stateCard
    })

    if (!updated) {
      newCards.push({key:uuid(),name: addedCard.attributes.name, count: 1, error: false})
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
            [name]: [...cards, {key: uuid(), name:'', count:'', error: false}],
          }
        }
      })
    } else {
      alert("Max cards reached")
    }
  }

  removeInput = (event, { id, name }) => {
    event.preventDefault()
    this.setState({
      fields: {
        ...this.state.fields,
        cards: {
          ...this.state.fields.cards,
          [id]: this.state.fields.cards[id].filter((input, index) => index !== parseInt(name, 10))
        }
      }
    })
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
      this.setState({validation: { error: false, message:"" }})
    } else {
      const message = `Name and format required for submission `
      this.setState({validation: { error: true, message }})
    }

  }

  render() {
    const { error, message } = this.state.validation
    const mainboard = this.state.fields.cards.mainboard.map((input, index) => {
      return (
        <DeckCardInput index={index} card={input} key={input.key} handleCardChange={this.handleCardChange} removeInput={this.removeInput} board='mainboard'/>
      )
    })
    const sideboard = this.state.fields.cards.sideboard.map((input, index) => {
      return (
        <DeckCardInput index={index} card={input} key={input.key} handleCardChange={this.handleCardChange} removeInput={this.removeInput} board='sideboard'/>
      )
    })

    const { name, archtype, format} = this.state.fields
    const { formats } = this.props
    return (
      <Container as={Segment} textAlign='left'>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input required inline type='text' label='Deck Name' value={name} name='name' onChange={this.handleChange} width={9}/>
          <Form.Field required inline width={8}>
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
          <Form.Field inline width={8}>
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
          <Button  onClick={this.appendInput} name='mainboard'>Add Card</Button>
          <Divider hidden/>
          <Form.Field>
            <label>Sideboard</label>
          </Form.Field>
          {sideboard}
          <Button onClick={this.appendInput} name='sideboard' >Add Card</Button>
          <Divider />
          <Form.Button >Submit</Form.Button>
        </Form>
        <Message warning attached hidden={ error === false}>
          <Message.Header >{message}</Message.Header>
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
