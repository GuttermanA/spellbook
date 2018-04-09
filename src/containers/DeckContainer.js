import React, { Component } from 'react';
import uuid from 'uuid'
import { connect } from 'react-redux'
import DeckCard from '../components/DeckCard'
import { Container } from 'semantic-ui-react'


class DeckContainer extends Component {
  render() {
    const decks = this.props.results.map(deck => <DeckCard key={uuid()} deck={deck.attributes}/>)
    const style = {
      minHeight: '500px'
    }
    return(
      <Container style={style} fluid>
        {!this.props.results.length ? <p>No decks found</p> : decks}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.decks.results,
    loading: state.decks.loading,
  }
}

export default connect(mapStateToProps)(DeckContainer)
