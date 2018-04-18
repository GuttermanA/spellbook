import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Dropdown, Checkbox } from 'semantic-ui-react'
import { conditionOptions } from '../globalVars'

class CollectionCardInput extends Component {

  render() {
    const { key, handleCardChange, handleFieldsChange, sets } = this.props
    const { name, count, setCode, condition, premium, wishlist } = this.props.card
    console.log(this.props.card);
    const index = this.index ? this.props.index : 1
    return (
      <Segment key={key}>

        <Form.Group>
          <Form.Field className='name-input' disabled={ this.props.editCollection ? true : false}>
            <input type='text' placeholder='Card name' value={name} name='name' data-position={index} onChange={handleCardChange}/>
          </Form.Field>
          <Form.Field className='number-input' >
            <input type='number' placeholder='Num'  value={count} name='count' data-position={index} onChange={handleCardChange}/>
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field >
            <Dropdown
              onChange={handleFieldsChange}
              options={sets}
              placeholder='Set'
              search
              selection
              value={setCode}
              name={index}
              id='setCode'
              compact
            />
          </Form.Field>
          <Form.Field >
            <Dropdown
              onChange={handleFieldsChange}
              options={conditionOptions}
              placeholder='Condition'
              selection
              value={condition}
              name={index}
              id='condition'
              compact
            />
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field >
            <Checkbox label='Premium' onChange={handleFieldsChange} name={`${index}`} checked={premium} id='premium' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Wishlist' onChange={handleFieldsChange} name={`${index}`} checked={wishlist} id='wishlist'/>
          </Form.Field>
        </Form.Group>

      </Segment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    sets: state.cards.sets.map((set) => {
      return {key: set.code, text: set.name, value: set.code}
    }),
  }
}

export default connect(mapStateToProps)(CollectionCardInput)
