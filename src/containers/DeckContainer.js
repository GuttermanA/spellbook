import React, { Component } from 'react';
import uuid from 'uuid'
import { connect } from 'react-redux'
import DeckCard from '../components/DeckCard'
import { Container , Message, Card} from 'semantic-ui-react'


class DeckContainer extends Component {

  state = {
    redirect: false,
  }

  componentDidMount = () => {
    if (this.props.location.state) {
      this.setState({
        redirect: this.props.location.state.redirect
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      this.setState({
        redirect: nextProps.location.state.redirect
      })
    }
  }

  render() {
    const { deckResults, currentUserDecks } = this.props
    const { redirect } = this.state
    const deckResultsCards = deckResults.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={false}/>)
    const currentUserDecksCards = currentUserDecks.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={true}/>)
    console.log(currentUserDecks);
    return(
      <Container >
        { (redirect && !deckResults.length) || (!redirect && !currentUserDecks.length) ? (
          <Message attached>
            <Message.Header content={redirect ? 'No decks found' : 'No decks yet'} />
          </Message>
        ): null }
        <Card.Group centered>
          {redirect ? deckResultsCards : currentUserDecksCards}
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deckResults: state.decks.results,
    loading: state.decks.loading,
    currentUserDecks: state.auth.currentUserDecks,
  }
}

export default connect(mapStateToProps)(DeckContainer)

// { (redirect && !deckResults.length) || (!redirect && !currentUserDecks.length) ? (
//   <Message attached>
//     <Message.Header content={redirect ? 'No decks found' : 'No decks yet'} />
//   </Message>
// ): null }
//
// <Card.Group centered>
//   {redirect ? deckResultsCards : currentUserDecks}
// </Card.Group>
