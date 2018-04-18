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
    console.log('DeckCard info',this.props);
    const { name, count } = this.props.card
    const { error, handleCardChange, index, removeInput, board, editing } = this.props

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
        <Form.Group  onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver} >
          { this.state.mouseOver && (

              <Label color='red' size='small' as='a' onClick={editing ? this.handleRemove : removeInput} id={board} name={index}>
                <Icon name='remove' size='large'/>
              </Label>

        )}
          <Form.Field width={12}  error={error} >
            { editing ? (
              <input disabled={ name ? true : false } type='text' placeholder='Card name' defaultValue={name} name='name' id={board} data-position={index} onChange={this.handleChange} />
            ):(
              <input type='text' placeholder='Card name' value={name} name='name' id={board} data-position={index} onChange={handleCardChange}/>
            )}
          </Form.Field>
          <Form.Field width={4} >
            { editing ? (
              <input type='number' placeholder='Num'  defaultValue={count} name='count' id={board} data-position={index} onChange={this.handleChange}/>
            ):(
              <input type='number' placeholder='Num'  value={count} name='count' id={board} data-position={index} onChange={handleCardChange}/>
            )}

          </Form.Field>
        </Form.Group>
      )
    }


  }


}

export default DeckCardInput
