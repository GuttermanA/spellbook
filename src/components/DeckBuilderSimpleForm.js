import React, { Component} from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Form, Button, Container, Segment, Dropdown, Message, Checkbox } from 'semantic-ui-react'
import { createDeck } from '../actions/decks'
import { withRouter } from 'react-router-dom'
import {  archtypeOptions } from '../globalVars'

class DeckBuilderSimpleForm extends Component {
  state = {
    fields: {
      name: "",
      archtype: "",
      format: "",
      user: this.props.userId,
      tournament: false,
      cards: {
        mainboard: [{name:"", number:""}],
        sideboard: [{name:"", number:""}],
      },
    },

    searchQuery: "",
    validation: {
      error: false,
      message: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fields: {
        ...this.state.fields,
        user: nextProps.userId
      }
    },()=>console.log(this.state.fields))
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
            [name]: [...cards, {name:'', number:''}],
          }
        }
      })
    } else {
      alert("Max cards reached")
    }
  }

  handleChange = (event, { name, value, searchQuery, checked }) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: checked ? checked : value,
      },
      searchQuery: searchQuery ? searchQuery : "",
    },()=> console.log(this.state.fields))
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  handleCardChange = (event) => {
    const { name, id, value } = event.target
    const position = event.target.dataset.position
    let copy = this.state.fields.cards[id].slice()
    let found = copy.find((input, index)=> index === parseInt(position, 10))
    found = {...found, [name]: value}
    copy[position] = found
    this.setState({
      fields: {
        ...this.state.fields,
        cards: {
          ...this.state.fields.cards,
          [id]: copy
        }
      }
    },()=> console.log())
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
    const { searchQuery } = this.state
    const formats = this.props.formats.map(format => {
      return { key: uuid(), text: format.name, value: format.name }
    })
    const nameStyle = {
      width: '70%'
    }
    const numberStyle = {
      width: '30%'
    }
    const mainboard = this.state.fields.cards.mainboard.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Field style={nameStyle} >
            <input type='text' placeholder='Card name' value={input.name} name='name' id='mainboard' data-position={index} onChange={this.handleCardChange}/>
          </Form.Field>
          <Form.Field style={numberStyle}>
            <input type='number' placeholder='Num'  value={input.number} name='number' id='mainboard' data-position={index} onChange={this.handleCardChange}/>
          </Form.Field>
        </Form.Group>
      )
    })
    const sideboard = this.state.fields.cards.sideboard.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Field style={nameStyle}>
            <input type='text' placeholder='Card name' value={input.name} name='name' data-position={index} id='sideboard' onChange={this.handleCardChange}/>
          </Form.Field>
          <Form.Field style={numberStyle}>
            <input type='number' placeholder='Num'  value={input.number} name='number' data-position={index} id='sideboard' onChange={this.handleCardChange}/>
          </Form.Field>
        </Form.Group>
      )
    })
    const { error, message } = this.state.validation
    const { name, archtype, format} = this.state.fields
    return (
      <Container as={Segment} textAlign='left'>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input required inline type='text' label='Deck Name' value={name} name='name' onChange={this.handleChange}/>
          <Form.Field required inline>
            <label>Format</label>
            <Dropdown
              onChange={this.handleChange}
              onSearchChange={this.handleSearchChange}
              options={formats}
              placeholder='Search format'
              search
              searchQuery={searchQuery}
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
    formats: state.decks.formats,
    archtypes: state.decks.archtypes,
    userId: state.auth.currentUser.id,
  }
}

export default connect(mapStateToProps, { createDeck })(withRouter(DeckBuilderSimpleForm))
