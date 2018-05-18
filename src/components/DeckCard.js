import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import cardBack from '../assets/images/card_back_2.jpeg'
import { connect } from 'react-redux'
import { selectDeck, deleteDeck } from '../actions/decks'
import { Card, List, Icon, Label } from 'semantic-ui-react'
import { dateFormater } from '../globalFunctions'

class DeckCard extends Component {

  handleClick = (event) => {
    this.props.selectDeck(this.props.deck, this.props.history, this.props.currentUser)
  }

  handleDelete = (event) => {
    this.props.deleteDeck(this.props.deck.id, this.props.history, this.props.currentUser)
  }

  render() {
    const {
      name,
      creator,
      archtype,
      // totalCards,
      // mainboard,
      // sideboard,
      tournament,
      // createdAt,
      updatedAt,
      format,
      id,
    } = this.props.deck
    const { currentUser } = this.props
    // const style = {
    //    height:"310px",
    //    width:"223px",
    //    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), center no-repeat url(${cardBack})`,
    //    backgroundSize: '223px 310px ',
    // }
    return (
      <Card  className='magic-card'>
        <Card.Content>
          <Card.Header as='a' content={name} floated='left' onClick={this.handleClick}/>
          <Card.Meta content={creator} />
          <List>
            <List.Item>
              <List.Header >Archtype</List.Header>
              {archtype}
            </List.Item>
            <List.Item>
              <List.Header >Format</List.Header>
              {format}
            </List.Item>
          </List>
          { tournament && (
            <Label basic horizontal>
              <Icon name={ tournament  ? 'trophy' : 'remove'} />
              Tournament
            </Label>
          )}

        </Card.Content>
        <Card.Content extra>
          {dateFormater(updatedAt)}
          {this.props.history.location.pathname !== "/" && <Label as='a' name='delete' onClick={this.handleDelete} attached='top right' icon='delete'/>}
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { selectDeck, deleteDeck })(withRouter(DeckCard))
