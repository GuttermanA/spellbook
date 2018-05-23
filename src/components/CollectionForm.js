import React, { Component } from 'react'
import CollectionCardInput from './CollectionCardInput'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addToCollection } from '../actions/collection'
import uuid from 'uuid'
import { Form, Button, Container, Segment, } from 'semantic-ui-react'

class CollectionForm extends Component {

  state = {
    fields: {
      cards:[{key:uuid(),name:"", count:"", setCode:"", condition:"", premium: false, wishlist: false, error: false}],
    },
    text: false,
    submitted: false,
    validation: {
      error: false,
      message: ""
    }
  }

  getDerivedStateFromProps(nextProps, prevState) {
    if (!this.state.submitted && Object.keys(nextProps.selectedCard).length && nextProps.selectedCard.type === 'collection') {
      this.addCard(nextProps.selectedCard)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    debugger
    if (nextState.submitted) {
      return false
    }
    return true
  }

  addCard = (addedCard) => {

    let updated = false
    const newCards = this.state.fields.cards.map((stateCard, index) => {
      const names = this.state.fields.cards.map(card => card.name)
      if (stateCard.name.toLowerCase() === addedCard.attributes.name.toLowerCase()) {
        ++stateCard.count
        updated = true
        return stateCard
      } else if (!stateCard.name && !names.includes(addedCard.attributes.name)) {
        updated = true
        stateCard.name = addedCard.attributes.name
        stateCard.setCode = addedCard.attributes.lastPrinting
        stateCard.count = 1
        return stateCard
      }

      return stateCard
    })

    if (!updated) {
      newCards.push({key:uuid(),name: addedCard.attributes.name, count: 1, setCode: addedCard.attributes.lastPrinting, condition:"", premium: false, wishlist: false, error: false})
    }
    this.setState({
      fields: {
        ...this.state.fields,
        cards: newCards,
      }
    },()=> console.log(this.state.fields.cards))
  }

  appendInput = (event, { name }) => {
    event.preventDefault()
    let cards = this.state.fields.cards
    this.setState({
      fields: {
        ...this.state.fields,
        cards: [...cards, {key: uuid(), name:"", count:"", setCode:"", condition:"", premium: false, wishlist: false}]
      }
    })
  }

  removeInput = (event, { name }) => {
    event.preventDefault()
    this.setState({
      fields: {
        ...this.state.fields,
        cards: this.state.fields.cards.filter((input, index) => index !== parseInt(name, 10))
      }
    })
  }

  handleCardChange = (event) => {
    const { name, value, checked } = event.target
    const position = event.target.dataset.position
    const copy = this.state.fields.cards.map((card, index) => {
      if (index === parseInt(position, 10)) {
        card[name] = checked ? checked : value
      }
      return card
    })
    this.setState({
      fields: {
        ...this.state.fields,
        cards: copy
      }
    },()=> console.log(this.state.fields.cards[0]))
  }

  handleFieldsChange = (event, { name, id, value, searchQuery }) => {
    let copy = this.state.fields.cards.slice()
    let found = copy.find((input, index)=> index === parseInt(name, 10))
    found = {...found, [id]: value}
    copy[name] = found
    this.setState({
      searchQuery: searchQuery,
      fields: {
        ...this.state.fields,
        cards: copy
      }
    },() => console.log(this.state.fields.cards))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addToCollection(this.state.fields, this.props.history, this.props.currentUser)
    this.setState({
      fields: {
        cards:[{key:uuid(),name:"", count:"", setCode:"", condition:"", premium: false, wishlist: false, error: false}],
      },
      text: false,
      submitted: true,
      validation: {
        error: false,
        message: ``
      }
    })
  }



  render() {

    const cards = this.state.fields.cards.map((input, index) => {
      return (
        <CollectionCardInput index={index} key={input.key} removeInput={this.removeInput} handleFieldsChange={this.handleFieldsChange} handleCardChange={this.handleCardChange} card={input} editCollection={this.editCollection}/>
      )
    })
    return (
      <Container as={Segment} textAlign='left'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Add to Collection</label>
          </Form.Field>
          {cards}
          <Button onClick={this.appendInput} name='mainboard'>Add Card</Button>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.currentUser.id,
    currentUser: state.auth.currentUser,
    selectedCard: state.cards.selected,
    sets: state.cards.sets.map((set) => {
      return {key: set.code, text: set.name, value: set.code}
    }),
  }
}

export default connect(mapStateToProps, { addToCollection })(withRouter(CollectionForm))
