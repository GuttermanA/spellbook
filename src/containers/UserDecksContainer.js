import React, { Component } from 'react';
import uuid from 'uuid'
import { connect } from 'react-redux'
import DeckCard from '../components/DeckCard'
import withAuth from '../components/hocs/withAuth'
import withLoader from '../components/hocs/withLoader'
import { Container, Item } from 'semantic-ui-react'


class UserDecksContainer extends Component {
  render() {
    console.log(this.props)
    const { currentUserDecks } = this.props
    const decks = currentUserDecks.map(deck => <DeckCard key={uuid()} deck={deck.attributes}/>)
    const style = {
      minHeight: '500px'
    }
    return(
      <Item.Group style={style} as={Container} divided>
        {!currentUserDecks.length ? <p>No decks yet</p> : decks}
      </Item.Group>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    currentUserDecks: state.auth.currentUserDecks,
  }
}

export default connect(mapStateToProps)(withAuth(withLoader(UserDecksContainer)))
