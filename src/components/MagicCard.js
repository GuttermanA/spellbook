import React, { Component } from 'react'
import cardBack from '../assets/card_back_2.jpg'
import uuid from 'uuid'
import CollectionCardInput from './CollectionCardInput'
import { connect } from 'react-redux'
import { selectCard } from '../actions/cards'
import { Card, List, Label, Button, Icon, Modal, Form,Segment,Container } from 'semantic-ui-react'

class MagicCard extends Component {

  state = {
    mouseOver: false,
    collectionView: false,
    infoView: false,
    editCollection: false,
    card: {},
  }

  handleAdd = (event) => {
    this.props.selectCard(this.props.card, event.target.name)
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

  handleMouseLeave = (event) => {
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

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.card);
  }

  handleCardChange = (event) => {
    const { name, value } = event.target
    this.setState({
      card: {
        ...this.state.card,
        [name]: value,
      }
    },()=> console.log(this.state.card))
  }

  handleFieldsChange = (event, { name, value }) => {
    this.setState({
      card: {
        ...this.state.card,
        [name]: value,
      }
    },()=> console.log(this.state.card))
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

    const { mouseOver, collectionView, showInfo, editCollection } = this.state
    const { pusherVisible, pusherType } = this.props
    const style = {
       height:"310px",
       width:"223px",
       // backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${cardBack})`,
       background: `center no-repeat linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${cardBack})`,
       backgroundSize: 'auto'
    }
    if (collectionView) {
      return (
      <div>
        <Card className='magic-card' onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={style}>
            {!showInfo ? (
              <div className="ui image" >
                <img src={imgUrl} alt={name}/>
                {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='mainboard' color='black' attached='top left' content='MB'/> }

                {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='sideboard' color='grey' attached='top right' content='SB'/>}

                {pusherVisible && pusherType === 'addToCollection' && mouseOver && <Label as='a' onClick={this.handleAdd} name='collection' color='black' attached='top left' content='Add' />}
                {mouseOver && <Label as='a' color='red' attached='bottom left' onClick={this.showInfo}>Info</Label>}
              </div>
            ) : (
              <Card.Content>
                <Card.Content extra>
                  {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='mainboard' color='black' attached='top left' content='MB'/> }

                  {pusherVisible && pusherType === 'createDeck' && mouseOver && <Label as='a' onClick={this.handleAdd} name='sideboard' color='grey' attached='top right' content='SB'/>}

                  {pusherVisible && pusherType === 'addToCollection' && mouseOver && <Label as='a' onClick={this.handleAdd} name='collection' color='black' attached='top left' content='Add' />}
                </Card.Content>
                <List>
                  <List.Item>
                    <List.Header>{name}</List.Header>
                  </List.Item>
                  <List.Item>
                    <List.Header>Count</List.Header>
                    {count}
                  </List.Item>
                  <List.Item>
                    <List.Header>Condition</List.Header>
                    {condition}
                  </List.Item>
                  <List.Item>
                    <List.Header>Set</List.Header>
                    {setName}
                  </List.Item>
                  <List.Item icon={ premium ? 'checkmark' : 'remove'} content='Foil'/>
                  <List.Item icon={ wishlist ? 'checkmark' : 'remove'} content='Wishlist'/>
                </List>
                {mouseOver && <Label as='a' color='red' attached='bottom left' onClick={this.showInfo}>Info</Label>}
                {mouseOver && <Label as='a' color='green' attached='bottom right' onClick={this.editCollection}>Edit</Label>}
              </Card.Content>

            )}
            <Modal
              size='mini'
              open={editCollection}
              closeIcon
              dimmer='inverted'
              style={{height: '325px'}}
            >
              <Label as='a' color='red' attached='top right'  onClick={this.editCollection}>Close</Label>
              <Modal.Header>Edit Card</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                  <CollectionCardInput key={uuid()} handleFieldsChange={this.handleFieldsChange} handleCardChange={this.handleCardChange} card={this.state.card}/>
                  <Button>Submit</Button>
                </Form>
              </Modal.Content>
            </Modal>
          </Card>
      </div>

      )

    } else {
      return (
        <Card onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ height:"310px", width:"223px"}}>
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
export default connect(null, { selectCard })(MagicCard)
//
// <Form onSubmit={this.handleSubmit}>
//   <CollectionCardInput key={uuid()} handleFieldsChange={this.handleFieldsChange} handleCardChange={this.handleCardChange} card={this.state.card}/>
//   <Button>Submit</Button>
// </Form>
