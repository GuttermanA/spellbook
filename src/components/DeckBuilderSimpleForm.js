import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class DeckBuilderSimpleForm extends Component {
  state = {
    mainboardInputs: [{name:'', number:''}],
    sideboardInputs: [{name:'', number:''}],
  }

  appendInput = (event, { name }) => {
    if (this.state[name].length <= 100) {
      this.setState({
        [name]: [...this.state[name], {name:'', number:''}]
      })
    } else {
      alert("Max cards reached")
    }

  }

  handleMainboardChange = (event, { name, id, value }) => {

    let copy = this.state.mainboardInputs.slice()
    let found = this.state.mainboardInputs.find((input, index)=> index === parseInt(id, 10))
    found = {...found, [name]: value}
    copy[id] = found
    this.setState({
      ...this.state,
      mainboardInputs: copy
    })
  }

  handleSideboardChange = (event, { name, id, value }) => {
    let copy = this.state.sideboardInputs.slice()
    let found = this.state.sideboardInputs.find((input, index)=> index === parseInt(id, 10))
    found = {...found, [name]: value}
    copy[id] = found
    this.setState({
      ...this.state,
      sideboardInputs: copy
    })
  }

  render() {
    console.log(this.state);
    const mainboardInputs = this.state.mainboardInputs.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Input type='text' placeholder='Card name' value={input.name} name='name' id={index} onChange={this.handleMainboardChange}/>
          <Form.Input type='number' placeholder='Number'  value={input.number}name='number' id={index} onChange={this.handleMainboardChange}/>
        </Form.Group>
      )
    })
    const sideboardInputs = this.state.sideboardInputs.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Input type='text' placeholder='Card name' value={input.name} name='name' id={index} onChange={this.handleSideboardChange}/>
          <Form.Input type='number' placeholder='Number' value={input.number} name='number' id={index} onChange={this.handleSideboardChange}/>
        </Form.Group>
      )
    })
    return (
      <Form>
        <label>Mainboard</label>
        {mainboardInputs}
        <Button onClick={this.appendInput} name='mainboardInputs'>Add Card</Button>
        <br/>
        <label>Sideboard</label>
        {sideboardInputs}
        <Button onClick={this.appendInput} name='sideboardInputs'>Add Card</Button>
        <Form.Button>Finalize</Form.Button>
      </Form>
    )
  }
}
