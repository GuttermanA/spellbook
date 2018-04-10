import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectDeck } from '../actions/decks'
import { Card, List, Icon } from 'semantic-ui-react'
import { dateFormater } from '../globalFunctions'

class DeckCard extends Component {

  handleClick = (event) => {
    this.props.selectDeck(this.props.deck, this.props.history)
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
    // const mainboardCards = this.props.mainboardCards
    // const sideboardCards = this.props.sideboardCards
    // const user = this.props.user
    return (
      <Card>
        <Card.Content>

          <Card.Header as={Link} to={`/decks/${id}`} content={name} floated='left' onClick={this.handleClick}/>
          <Card.Meta content={creator}/>
          <List>
            <List.Item>
              <List.Header>Archtype</List.Header>
              {archtype}
            </List.Item>
            <List.Item>
              <List.Header>Format</List.Header>
              {format}
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          {tournament ? (<Icon name='trophy' corner/>) : null}
          {dateFormater(updatedAt)}
        </Card.Content>
      </Card>
    )
  }
}

export default connect(null, { selectDeck })(withRouter(DeckCard))
