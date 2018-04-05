import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { Form, Button, Container, Segment } from 'semantic-ui-react'
import { createDeck } from '../actions/decks'

class DeckBuilderSimpleForm extends Component {
  state = {
    name: '',
    archtype:'',
    format:'',
    cards: {
      mainboard: [{name:'', number:''}],
      sideboard: [{name:'', number:''}],
    },
  }

  appendInput = (event, { name }) => {
    if (this.state.cards[name].length <= 100) {
      this.setState({
        cards: {
          ...this.state.cards,
          [name]: [...this.state.cards[name], {name:'', number:''}],
        }

      })
    } else {
      alert("Max cards reached")
    }
  }

  handleChange = (event, { name, value }) => {
    this.setState({
      [name]: value
    })
  }

  handleCardChange = (event) => {
    const { name, id, value } = event.target
    const position = event.target.dataset.position
    let copy = this.state.cards[id].slice()
    let found = copy.find((input, index)=> index === parseInt(position, 10))
    found = {...found, [name]: value}
    copy[position] = found
    this.setState({
      cards: {
        ...this.state.cards,
        [id]: copy
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createDeck(this.state)
  }

  render() {
    console.log(this.props);
    const formats = this.props.formats.map(format => {
      return { key: uuid(), text: format.name, value: format.name }
    })
    const nameStyle = {
      width: '70%'
    }
    const numberStyle = {
      width: '30%'
    }
    const mainboard = this.state.cards.mainboard.map((input, index) => {
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
    const sideboard = this.state.cards.sideboard.map((input, index) => {
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
    return (
      <Container as={Segment}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input inline type='text' label='Deck Name' value={this.state.name} name='name' onChange={this.handleChange}/>
          <Form.Input inline type='text' label='Archtype' value={this.state.archtype} name='archtype' onChange={this.handleChange}/>
          <Form.Select inline label='Format' placeholder='Select' value={this.state.format} name='format' options={formats} onChange={this.handleChange}/>
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
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    formats: state.decks.formats
  }
}

export default connect(mapStateToProps, { createDeck })(DeckBuilderSimpleForm)
