import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectDeck } from '../actions/decks'

class DeckCard extends Component {

  handleClick = (event) => {
    this.props.selectDeck(this.props.deck, this.props.history)
  }

  render() {
    const {
      name,
      // creator,
      // archtype,
      // totalCards,
      // mainboard, sideboard,
      // tournament,
      // createdAt,
      // updatedAt
    } = this.props.deck
    // const mainboardCards = this.props.mainboardCards
    // const sideboardCards = this.props.sideboardCards
    // const user = this.props.user
    return (
      <p onClick={this.handleClick}>{name}</p>
    )
  }
}

export default connect(null, { selectDeck })(withRouter(DeckCard))
