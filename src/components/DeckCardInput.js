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

    const { index, board, editing, id } = this.props
    const { error, key, name, count, card_id } = this.props.card
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
            <Label color='red' size='small' as='a' corner='left' onClick={this.props.removeInput} id={key} name='remove'>
              <Icon name='remove' size='large'/>
            </Label>
          )}

          <Form.Input type='text' disabled={!!card_id} error={error} placeholder='Card name' value={name} name='name' id={key} className='name-input' onChange={this.props.handleCardChange}/>
          <Form.Input type='number' placeholder='N' value={count} name='count' id={key} className='number-input' onChange={this.props.handleCardChange}/>
            {
            //   editing ? (
            //   <Form.Field width={editing ? 10 : 12}  error={error} >
            //     <input disabled={ name ? true : false } type='text' placeholder='Card name' defaultValue={name} name='name' id={board} data-position={index} onChange={this.handleChange} />
            //   </Form.Field>
            // ):(
            //   <Form.Input type='text' error={error} placeholder='Card name' value={name} name='name' id={key} className='name-input' onChange={this.props.handleCardChange}/>
            // )
          }


            {
            //   editing ? (
            //   <Form.Field width={4} >
            //     <input type='number' placeholder='N'  defaultValue={count} name='count' id={board} data-position={index} onChange={this.handleChange}/>
            //   </Form.Field>
            // ):(
            //   <Form.Input type='number' placeholder='N' value={count} name='count' id={key} className='number-input' onChange={this.props.handleCardChange}/>
            // )
          }


          { editing && (
            <Icon name='remove' id={key} corner fitted onClick={this.props.removeInput} name='remove'/>
          )}
        </Form.Group>
      )
    }


  }


}

export default DeckCardInput
