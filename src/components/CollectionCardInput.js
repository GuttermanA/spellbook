import React from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Dropdown, Label, Icon, Button } from 'semantic-ui-react'
import { conditionOptions } from '../globalVars'

const CollectionCardInput = (props) => {

    const { handleCardChange, handleFieldsChange, removeInput, sets, modal } = props
    const { name, count, setCode, condition, premium, wishlist } = props.card
    const index = props.index >= 0 ? props.index : 1
    const key = props.key ? props.key : props.card.key

    return (
      <Segment key={key}>

        {!modal && (<Label color='red' size='small' as='a' corner='left' onClick={removeInput} name={index}>
          <Icon name='remove' size='large'/>
        </Label>)}

        <Form.Group>
          <Form.Input placeholder='Card name' id='name' name={index} className='name-input' onChange={handleFieldsChange} value={name} disabled={ props.editCollection ? true : false}/>
            {
            // <Form.Field>

                // <input type='text' placeholder='Card name' value={name} name='name' data-position={index} onChange={handleCardChange}/>
            // </Form.Field>
            }

          <Form.Input type='number' placeholder='Num' name={index} value={count} id='count' onChange={handleFieldsChange} className='number-input' />

            {
              // <Form.Field>
              // <input type='number' placeholder='Num'  value={count} name='count' data-position={index} onChange={handleCardChange}/>
              // </Form.Field>
            }

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
            <div className="ui checkbox">
              <input type="checkbox" name="premium" data-position={index} value={premium} onChange={handleCardChange}/>
              <label>Foil</label>
            </div>

          </Form.Field>
          <Form.Field>
            <div className="ui checkbox">
              <input type="checkbox" name='wishlist' data-position={index} value={wishlist} onChange={handleCardChange}/>
              <label>Wishlist</label>
            </div>

          </Form.Field>
        </Form.Group>

      </Segment>
    )


}

const mapStateToProps = (state) => {
  return {
    sets: state.cards.sets.map((set) => {
      return {key: set.code, text: set.name, value: set.code}
    }),
  }
}

export default connect(mapStateToProps)(CollectionCardInput)

// <Checkbox label='Premium' onChange={handleFieldsChange} name={`${index}`} checked={premium} id={`premium-${key}`} data-field='premium'/>
// <Checkbox label='Wishlist' onChange={handleFieldsChange} name={`${index}`} checked={wishlist} id={`wishlist-${key}`} data-field='wishlist'/>
