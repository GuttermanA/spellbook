import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { conditionOptions } from '../globalVars'
import { addToCollection } from '../actions/collection'
import uuid from 'uuid'
import { Form, Button, Container, Segment, Dropdown, Checkbox } from 'semantic-ui-react'



class CollectionForm extends Component {

  state = {
    fields: {
      cards:[{key:uuid(),name:"", number:"", set:"", condition:"", premium: false, wishlist: false, error: false}],
    },
    text: false,
    validation: {
      error: false,
      message: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.selectedCard).length && nextProps.selectedCard.type === 'collection') {
      this.addCard(nextProps.selectedCard)
    }
  }

  addCard = (addedCard) => {

    let updated = false
    const newCards = this.state.fields.cards.map((stateCard, index) => {
      const names = this.state.fields.cards.map(card => card.name)
      if (stateCard.name.toLowerCase() === addedCard.attributes.name.toLowerCase()) {
        ++stateCard.number
        updated = true
        return stateCard
      } else if (!stateCard.name && !names.includes(addedCard.attributes.name)) {
        updated = true
        stateCard.name = addedCard.attributes.name
        stateCard.set = addedCard.attributes.lastPrinting
        stateCard.number = 1
        return stateCard
      }

      return stateCard
    })

    if (!updated) {
      newCards.push({key:uuid(),name: addedCard.attributes.name, number: 1, set: addedCard.attributes.lastPrinting, condition:"", premium: false, wishlist: false, error: false})
    }
    this.setState({
      fields: {
        ...this.state.fields,
        cards: newCards,
      }
    })
  }

  appendInput = (event, { name }) => {
    event.preventDefault()
    let cards = this.state.fields.cards
    this.setState({
      fields: {
        ...this.state.fields,
        cards: [...cards, {key: uuid(), name:"", number:"", set:"", condition:"", premium: false, wishlist: false}]
      }
    })
  }

  handleCardChange = (event) => {
    const { name, value } = event.target
    const position = event.target.dataset.position
    const copy = this.state.fields.cards.map((card, index) => {
      if (index === parseInt(position, 10)) {
        card[name] = value
      }
      return card
    })
    this.setState({
      fields: {
        ...this.state.fields,
        cards: copy
      }
    })
  }

  handleFieldsChange = (event, { name, id, value, checked, searchQuery }) => {
    let copy = this.state.fields.cards.slice()
    let found = copy.find((input, index)=> index === parseInt(name, 10))
    found = {...found, [id]: checked ? checked : value}
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
    this.props.addToCollection(this.state.fields, this.props.history)
  }

  render() {
    const { sets } = this.props

    const cards = this.state.fields.cards.map((input, index) => {
      return (
        <Segment key={input.key}>

          <Form.Group>
            <Form.Field className='name-input'  >
              <input type='text' placeholder='Card name' value={input.name} name='name' data-position={index} onChange={this.handleCardChange}/>
            </Form.Field>
            <Form.Field className='number-input' >
              <input type='number' placeholder='Num'  value={input.number} name='number' data-position={index} onChange={this.handleCardChange}/>
            </Form.Field>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field >
              <Dropdown
                onChange={this.handleFieldsChange}
                options={sets}
                placeholder='Set'
                search
                selection
                value={input.set}
                name={index}
                id='set'
                compact
              />
            </Form.Field>
            <Form.Field >
              <Dropdown
                onChange={this.handleFieldsChange}
                options={conditionOptions}
                placeholder='Condition'
                selection
                value={input.condition}
                name={index}
                id='condition'
                compact
              />
            </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field >
              <Checkbox label='Premium' onChange={this.handleFieldsChange} name={`${index}`} checked={input.premium} id='premium'/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='Wishlist' onChange={this.handleFieldsChange} name={`${index}`} checked={input.wishlist} id='wishlist'/>
            </Form.Field>
          </Form.Group>

        </Segment>
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
    selectedCard: state.cards.selected,
    sets: state.cards.sets.map((set) => {
      return {key: set.code, text: set.name, value: set.code}
    }),
  }
}

export default connect(mapStateToProps, { addToCollection })(withRouter(CollectionForm))
