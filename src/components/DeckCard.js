import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectDeck } from '../actions/decks'
import { Item, Button, Icon } from 'semantic-ui-react'

class DeckCard extends Component {

  handleClick = (event) => {
    this.props.selectDeck(this.props.deck, this.props.history)
  }

  render() {
    console.log(this.props.deck)
    const {
      name,
      creator,
      archtype,
      totalCards,
      mainboard,
      sideboard,
      tournament,
      createdAt,
      updatedAt,
      id,
    } = this.props.deck
    const mainboardCards = this.props.mainboardCards
    const sideboardCards = this.props.sideboardCards
    const user = this.props.user
    return (
      <Item>
        <Item.Content>
          <Item.Header as={Link} exact to={`decks/${id}`} content={name}/>
          <Item.Meta> </Item.Meta>
          <Item.Extra>
            <Button primary floated='right'>
              View deck
              <Icon name='right chevron' />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default connect(null, { selectDeck })(withRouter(DeckCard))
