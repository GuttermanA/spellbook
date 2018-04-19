import React, { Component } from 'react';
import uuid from 'uuid'
import withLoader from '../components/hocs/withLoader'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/auth'
import DeckCard from '../components/DeckCard'
import { Container , Message, Card, Dimmer, Loader, Divider } from 'semantic-ui-react'


class DeckContainer extends Component {

  state = {
    redirect: false,
    message: "",
  }

  componentDidMount = () => {
    this.props.fetchUser()
    if (this.props.location.state) {
      const { redirect, message } = this.props.location.state
      this.setState({
        redirect: redirect,
        message: message,
      },() => console.log(this.state))
    } else {
      this.setState({
        redirect: false,
        message: "",
      })
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      const { redirect, message } = nextProps.location.state
      this.setState({
        redirect: redirect,
        message: message,
      },() => console.log(this.state))
    } else {
      this.setState({
        redirect: false,
        message: "",
      })
    }
  }

  render() {
    const { deckResults, currentUserDecks } = this.props
    const { redirect, message } = this.state
    const deckResultsCards = deckResults.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={false}/>)
    const currentUserDecksCards = currentUserDecks.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={true}/>)
    if (this.props.loading) {
      return <Dimmer active><Loader /></Dimmer>
    } else {
      return(
        <Container >
          { message && (
            <Message attached>
              <Message.Header content={message} />
            </Message>
          )}
          { message && <Divider/>}
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
}

const mapStateToProps = (state) => {
  return {
    deckResults: state.decks.results,
    loading: state.decks.loading,
    currentUserDecks: state.auth.currentUserDecks,
  }
}

export default connect(mapStateToProps, { fetchUser })(withLoader(DeckContainer))
