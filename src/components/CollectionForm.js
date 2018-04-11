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
      user: this.props.userId,
      cards:[{name:"", number:"", set:"", condition:"", premium: false, wishlist: false}],
    },
    text: false,
    searchQuery: "",
    validation: {
      error: false,
      message: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.state.user) {
      this.setState({fields: {...this.state.fields, user: nextProps.userId}})
    }

    if (Object.keys(nextProps.selectedCard).length && nextProps.selectedCard.type === 'collection') {
      this.addCard(nextProps.selectedCard)
    }
  }

  addCard = (card) => {
    const cards = [...this.state.fields.cards]
    const foundCard = cards.find(stateCard => stateCard.name.toLowerCase() === card.attributes.name.toLowerCase())
    if (!foundCard) {
      this.setState({
        fields: {
          ...this.state.fields,
          cards: cards.length === 1 && (!cards[0].name && !cards[0].number) ? [{name: card.attributes.name, number: 1}] : [...cards, {name: card.attributes.name, number: 1, set:"", condition:"", premium: false, wishlist: false}]
        }
      })
    } else {
      ++cards[cards.indexOf(foundCard)].number
      this.setState({
        fields: {
          ...this.state.fields,
          cards: cards
        }
      })
    }
  }

  handleChange = (event, { name, value, searchQuery, checked }) => {
    console.log(name, value, checked);
    // this.setState({
    //   fields: {
    //     ...this.state.fields,
    //     [name]: checked ? checked : value,
    //   },
    //   searchQuery: searchQuery ? searchQuery : "",
    // },()=> console.log(this.state.fields))
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  appendInput = (event, { name }) => {
    event.preventDefault()
    let cards = this.state.fields.cards
    this.setState({
      fields: {
        ...this.state.fields,
        cards: [...cards, {name:"", number:"", set:"", condition:"", premium: false, wishlist: false}]
      }
    },()=> console.log(this.state.fields.cards))
  }

  handleCardChange = (event) => {
    const { name, id, value } = event.target
    const position = event.target.dataset.position
    let copy = this.state.fields.cards.slice()
    let found = copy.find((input, index)=> index === parseInt(position, 10))
    found = {...found, [name]: value}
    copy[position] = found
    this.setState({
      fields: {
        ...this.state.fields,
        cards: copy
      }
    },()=> console.log(this.state.fields.cards))
  }

  handleFieldsChange = (event, { name, id, value, checked, searchQuery }) => {
    let copy = this.state.fields.cards.slice()
    let found = copy.find((input, index)=> index === parseInt(name, 10))
    found = {...found, [id]: checked ? checked : value}
    copy[name] = found
    this.setState({
      searchQuery: searchQuery ? searchQuery : this.state.searchQuery,
      fields: {
        ...this.state.fields,
        cards: copy
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addToCollection(this.state.fields, this.props.history)
  }

  render() {
    const { searchQuery } = this.state
    const sets = this.props.sets.map((set) => {
      return {key: set.name, text: set.name, value: set.name}
    })
    const cards = this.state.fields.cards.map((input, index) => {
      let element = 1
      return (
        <Segment key={index}>

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
                onSearchChange={this.handleSearchChange}
                options={sets}
                placeholder='Set'
                search
                searchQuery={searchQuery}
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
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.currentUser.id,
    selectedCard: state.cards.selected,
    sets: state.cards.sets,
  }
}

export default connect(mapStateToProps, { addToCollection })(withRouter(CollectionForm))

// <Form.Field className='name-input'  >
//   <input type='text' placeholder='Card name' value={input.name} name='name' data-position={index} onChange={this.handleCardChange}/>
// </Form.Field>
// <Form.Field className='number-input' >
//   <input type='number' placeholder='Num'  value={input.number} name='number' data-position={index} onChange={this.handleCardChange}/>
// </Form.Field>
//
