import React, { Component } from 'react'
import { Form, Segment, Icon, Label } from 'semantic-ui-react'

class DeckCardInput extends Component  {

  state = {
    mouseOver: false,
    removed: false,
  }

  handleMouseOver = (event) => {
    this.setState({
      mouseOver: !this.state.mouseOver
    })
  }

  handleChange = (event) => {
    this.props.handleChange(event, this.props.card)
  }

  handleRemove = (event) => {
    this.props.handleRemove(event, this.props.card)
  }


  render() {
    const { index, removeInput, board, editing, id } = this.props
    const { error, key } = this.props.card
    const { name, count} = this.props.card.info





    if (this.state.removed && name.length) {
      return (
        <Segment tertiary size='small'>
          <Label color='green' size='small' as='a' onClick={this.handleRemove} id={board} name={index}>
            restore
          </Label>
          {`${count} ${name}`} removed
        </Segment>)
    } else {
      return (
        <Form.Group as={editing ? null : Segment} >
          {!editing && (
            <Label color='red' size='small' as='a' corner={editing ? false : 'left'} onClick={editing ? this.handleRemove : this.props.removeInput} id={key} name='remove'>
              <Icon name='remove' size='large'/>
            </Label>
          )}


            { editing ? (
              <Form.Field width={editing ? 10 : 12}  error={error} >
                <input disabled={ name ? true : false } type='text' placeholder='Card name' defaultValue={name} name='name' id={board} data-position={index} onChange={this.handleChange} />
              </Form.Field>
            ):(
              <Form.Input type='text' placeholder='Card name' value={name} name='name' id={key} className='name-input' onChange={this.props.handleCardChange}/>
            )}


            { editing ? (
              <Form.Field width={4} >
                <input type='number' placeholder='N'  defaultValue={count} name='count' id={board} data-position={index} onChange={this.handleChange}/>
              </Form.Field>
            ):(
              <Form.Input type='number' placeholder='N' value={count} name='count' id={key} className='number-input' onChange={this.props.handleCardChange}/>
            )}


          { editing && (
            <Icon name='remove' corner fitted onClick={editing ? this.handleRemove : removeInput}/>
          )}
        </Form.Group>
      )
    }


  }


}

export default DeckCardInput
