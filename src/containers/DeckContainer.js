import React, { Component } from 'react';
import uuid from 'uuid'
import withLoader from '../components/hocs/withLoader'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/auth'
import { fetchDecks } from '../actions/decks'
import DeckCard from '../components/DeckCard'
import { Container , Message, Card, Dimmer, Loader, Divider } from 'semantic-ui-react'


class DeckContainer extends Component {

  state = {
    userPage: false,
    visible: false,
    message: "",
    decks: [],
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedIn && nextProps.match.path === '/:username/decks') {
      return {
        message: (nextProps.location.state && nextProps.location.state.message) || "",
        visible: (nextProps.location.state && nextProps.location.state.message) || false,
        userPage: true,
        decks: nextProps.currentUserDecks,
      }
    }

    if ( nextProps.loggedIn && nextProps.match.path === '/:username/decks' && prevState.userPage === false) {
      nextProps.fetchUser()
      return {
        message: (nextProps.location.state && nextProps.location.state.message) || "",
        visible: (nextProps.location.state && nextProps.location.state.message) || false,
        userPage: true,
        decks: nextProps.currentUserDecks,
      }
    }

    if (nextProps.match.path === '/decks/search') {
      return {
        message: (nextProps.location.state && nextProps.location.state.message) || "",
        visible: (nextProps.location.state && nextProps.location.state.message) || false,
        userPage: false,
        decks: nextProps.deckResults
      }
    }

    return null
  }

  componentDidMount = () => {
    if (this.props.loggedIn && this.props.match.path === '/:username/decks') {
      this.props.fetchUser()
      this.setState({
        userPage: true,
        decks: this.props.currentUserDecks,
      })
    } else if (!this.props.loading && !this.props.deckResults.length && this.props.match.path !== '/:username/decks') {
      this.props.fetchDecks({term: "default"}, this.props.history)
    } else if (this.props.match.path === '/decks/search') {
      this.setState({
        userPage: false,
        decks: this.props.deckResults,
      })
    }
  }

  handleDismiss = () => {
    this.setState({ visible: false, message: "" })
  }

  render() {
    const { userPage, message, decks } = this.state
    const deckCards = decks.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={false}/>)

    if (this.props.loading) {
      return <Dimmer active><Loader /></Dimmer>
    } else {
      return(
        <Container fluid>
          {this.state.visible &&
            <Container>
              <Message attached onDismiss={this.handleDismiss} >
                <Message.Header content={message} />
              </Message>
            </Container>
          }

          { this.state.visible && <Divider/>}
          { ((!userPage && !decks.length) || (userPage && !decks.length)) && (
            <Container>
              <Message attached>
                <Message.Header content={userPage ? 'No decks yet' :  'No decks found'} />
              </Message>
            </Container>
          )}
          <Card.Group centered>
            {deckCards}
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
    currentUser: state.auth.currentUser,
    authLoading: state.auth.loading
  }
}

export default connect(mapStateToProps, { fetchUser, fetchDecks })(withLoader(DeckContainer))
