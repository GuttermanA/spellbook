import React, { Component } from 'react';
import uuid from 'uuid'
import { connect } from 'react-redux'
import DeckCard from '../components/DeckCard'
import withAuth from '../components/hocs/withAuth'
import withLoader from '../components/hocs/withLoader'
import { Container } from 'semantic-ui-react'


class UserDecksContainer extends Component {
  render() {
    const decks = this.props.decks.map(deck => <DeckCard key={uuid()} deck={deck.attributes}/>)
    const style = {
      minHeight: '500px'
    }
    return(
      <Container style={style} fluid>
        {!this.props.decks.length ? <p>No decks yet</p> : decks}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  }
}

export default connect(mapStateToProps)(withAuth(withLoader(UserDecksContainer)))
