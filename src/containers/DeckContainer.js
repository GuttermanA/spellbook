import React, { Component } from 'react';
import uuid from 'uuid'
import withLoader from '../components/hocs/withLoader'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/auth'
import DeckCard from '../components/DeckCard'
import { Container , Message, Card, Dimmer, Loader, Divider } from 'semantic-ui-react'


class DeckContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userPage: false,
      message: "",
      decks: props.location.state.userPage ? props.currentUserDecks : props.deckResults
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // debugger
    if (nextProps.loggedIn && !prevState.decks.length) {

      nextProps.fetchUser()
    }
  }

  componentDidMount = () => {
    if (this.props.loggedIn && this.props.match.params.username === this.props.currentUser.name) {
      this.setState({ userPage: true }, () => this.props.fetchUser())
    }

  }

  render() {
    const { userPage, message, decks } = this.state
    console.log('LOADED DECKS', this.props.currentUser);
    const deckCards = decks.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={false}/>)
    // const currentUserDecksCards = currentUserDecks.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={true}/>)
    if (this.props.loading) {
      return <Dimmer active><Loader /></Dimmer>
    } else {
      return(
        <Container fluid>
          { message && (
            <Message attached>
              <Message.Header content={message} />
            </Message>
          )}
          { message && <Divider/>}
          { ((!userPage && !decks.length) || (userPage && !decks.length)) && (
            <Message attached>
              <Message.Header content={userPage ? 'No decks yet' :  'No decks found'} />
            </Message>
          )}
          <Card.Group centered>
            {
              deckCards
              // userPage ? currentUserDecksCards : deckResultsCards
            }
          </Card.Group>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    deckResults: state.decks.results,
    loading: state.decks.loading,
    currentUserDecks: state.auth.currentUserDecks,
    loggedIn: !!state.auth.currentUser.id,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { fetchUser })(withLoader(DeckContainer))
