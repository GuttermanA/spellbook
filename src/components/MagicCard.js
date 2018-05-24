import React, { Component } from 'react'
import uuid from 'uuid'
import CollectionCardInput from './CollectionCardInput'
import { connect } from 'react-redux'
import { selectCard } from '../actions/cards'
import { updateCollection, deleteFromCollection } from '../actions/collection'
import { Card, List, Label, Button, Icon, Modal, Form } from 'semantic-ui-react'

class MagicCard extends Component {

  state = {
    mouseOver: false,
    collectionView: false,
    infoView: false,
    editCollection: false,
    card: {},
    key: uuid()
  }

  handleAdd = (event) => {
    const sideboard = event.target.name === 'sideboard'
    this.props.selectCard(this.props.card, sideboard)
  }

  componentDidMount() {
    if (this.props.type === 'collection_card') {
      this.setState( { collectionView: true, card:this.props.card })
    }
  }

  handleMouseOver = (event) => {
    this.setState({
      mouseOver: !this.state.mouseOver
    })
  }

  showInfo = (event) => {
    this.setState({
      showInfo: !this.state.showInfo
    })
  }

  editCollection = (event) => {
    event.preventDefault()
    this.setState({
      editCollection: !this.state.editCollection,
      mouseOver: false,
    })
  }



  handleCardChange = (event) => {
    const { name, value, checked } = event.target
    this.setState({
      card: {
        ...this.state.card,
        [name]: checked ? checked : value,
      }
    })
  }

  handleFieldsChange = (event, { id, value}) => {
    this.setState({
      card: {
        ...this.state.card,
        [id]: value,
      }
    })
  }

  handleDelete = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.deleteFromCollection(this.state.card.id)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateCollection(this.state.card)
  }

  render(){
    const {
        // id,
        name,
        // cmc,
        // mana_cost,
        // color_identity,
        // base_type,
        // rarity,
        // power,
        // toughness,
        // text,
        imgUrl,
        count,
        condition,
        setName,
        premium,
        wishlist,
    } = this.props.card

    const { mouseOver, collectionView, showInfo, editCollection, key } = this.state
    const { pusherVisible, pusherType } = this.props
    if (collectionView) {
      return (
        <Card className='magic-card' onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver}>
            {!showInfo ? (
              <div className="ui image" >
                <img src={imgUrl} alt={name}/>
                {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='mainboard' color='black' attached='top left' content='MB'/> }

                {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='sideboard' color='grey' attached='top right' content='SB'/>}

                {pusherVisible && pusherType === 'addToCollection' && mouseOver && <Label as='a' onClick={this.handleAdd} name='collection' color='black' attached='top left' content='Add' />}
                <Label as='a' color='red' attached='bottom left' onClick={this.showInfo}>Info</Label>
              </div>
            ) : (
              <Card.Content >
                <Card.Content extra>
                  {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='mainboard' color='black' attached='top left' content='MB'/> }

                  {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='sideboard' color='grey' attached='top right' content='SB'/>}

                  {pusherVisible && pusherType === 'addToCollection' && mouseOver && <Label as='a' onClick={this.handleAdd} name='collection' color='black' attached='top left' content='Add' />}
                </Card.Content>
                <List >
                  <List.Item className="white-text">
                    <List.Header>{name}</List.Header>
                  </List.Item>
                  <List.Item>
                    <List.Header>Count:</List.Header>
                    {count}
                  </List.Item>
                  <List.Item>
                    <List.Header>Condition:</List.Header>
                    {condition}
                  </List.Item>
                  <List.Item>
                    <List.Header>Set:</List.Header>
                    {setName}
                  </List.Item>
                  <List.Item>
                    <Label basic horizontal>
                      <Icon name={ premium ? 'checkmark' : 'remove'} />
                      Foil
                    </Label>
                    <Label basic horizontal>
                      <Icon name={ wishlist ? 'checkmark' : 'remove'} />
                      Wishlist
                    </Label>
                  </List.Item>
                </List>
                {<Label as='a' color='red' attached='bottom left' onClick={this.showInfo}>Card</Label>}
                {<Label as='a' color='green' attached='bottom right' onClick={this.editCollection}>Edit</Label>}
              </Card.Content>

            )}
            <Modal
              id="collection-modal"
              size='mini'
              open={editCollection}
              dimmer='inverted'
            >
              <Modal.Header>
                Edit Card
                <Button color='red' basic onClick={this.editCollection} floated='right' size='small'>Close</Button>
              </Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                  <CollectionCardInput key={key} modal={true} handleFieldsChange={this.handleFieldsChange} handleCardChange={this.handleCardChange} card={this.state.card} editCollection={this.editCollection}/>
                  <Button>Submit</Button>
                  <Button onClick={this.handleDelete}>Remove from Collection</Button>

                </Form>
              </Modal.Content>
            </Modal>
          </Card>

      )

    } else {
      return (
        <Card className='magic-card' onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver}>
            <div className="ui image" >
              <img src={imgUrl} alt={name}/>
              {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='mainboard' color='black' attached='top left' content='MB'/> }

              {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='sideboard' color='grey' attached='top right' content='SB'/>}

              {pusherVisible && pusherType === 'addToCollection' && mouseOver && <Label as='a' onClick={this.handleAdd} name='collection' color='black' attached='top left' content='Add' />}
            </div>
        </Card>
      )
    }
  }


}
export default connect(null, { selectCard, updateCollection, deleteFromCollection })(MagicCard)
