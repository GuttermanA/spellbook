import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Container } from 'semantic-ui-react'

const types = [
  {
    text: "",
    value: ""
  },
  {
    text: "Basic Land",
    value: "Basic Land"
  },
  {
    text: "Land",
    value: "Land"
  },
  {
    text: "Creature",
    value: "Creature"
  },
  {
    text: "Instant",
    value: "Instant"
  },
  {
    text: "Sorcery",
    value: "Sorcery"
  },
  {
    text: "Artifact",
    value: "Artifact"
  },
  {
    text: "Enchantment",
    value: "Enchantment"
  },
  {
    text: "Planeswalker",
    value: "Planeswalker"
  },
  {
    text: "Artifact Creature",
    value: "Artifact Creature"
  }
]

class CardSearchForm extends Component {

  state = {
    name: "",
    base_type: "",
    power: "",
    toughness: "",
    white: false,
    blue: false,
    black: false,
    red: false,
    green: false,
    redirect: false,
  }

  handleChange = (event, {value, id, checked, type}) => {
      if (type === "checkbox") {
        this.setState({
          [id]: checked
        },()=> console.log(this.state))
      } else {
        this.setState({
          [id]: value
        },()=> console.log(this.state))
      }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.search(this.state)
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/cards"/>
      )
    }
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Name' placeholder='Name' id="name" value={this.state.name} onChange={this.handleChange} value={this.state.name}/>
            <Form.Select fluid label='Type' options={types} placeholder='Type' id="base_type" value={this.state.type} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Power' type="number" placeholder='Power' id="power" value={this.state.power} onChange={this.handleChange}/>
            <Form.Input fluid label='Toughness' type="number" placeholder='Toughness' id="toughness" value={this.state.toughness} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group inline>
            <label>Color</label>
            <Form.Checkbox label="White" value="W" id="white" onChange={this.handleChange}/>
            <Form.Checkbox label="Blue" value="U" id="blue" onChange={this.handleChange}/>
            <Form.Checkbox label="Black" value="B" id="black" onChange={this.handleChange}/>
            <Form.Checkbox label="Red" value="R" id="red" onChange={this.handleChange}/>
            <Form.Checkbox label="Green" value="G" id="green" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>


    )
  }
}

export default CardSearchForm
