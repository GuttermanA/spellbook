import React, { Component } from 'react';
import uuid from 'uuid'
import withLoader from '../components/hocs/withLoader'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/auth'
import DeckCard from '../components/DeckCard'
import { Container , Message, Card, Dimmer, Loader, Divider } from 'semantic-ui-react'


class DeckContainer extends Component {

  state = {
    userPage: false,
    message: "",
  }

  componentDidMount = () => {
    if (this.props.loggedIn && this.props.location.pathname !== "/decks/search") {
      this.props.fetchUser()
      this.setState({ userPage: true })
    }
    // if (this.props.location.state) {
    //   // const { redirect, message } = this.props.location.state
    //   this.setState({
    //     userPage: redirect,
    //     // message: message,
    //   },() => console.log(this.state))
    // } else {
    //   this.setState({
    //     redirect: false,
    //     // message: "",
    //   })
    // }

  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.loggedIn && nextProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchUser()
      this.setState({ userPage: true })
    }
    //   const { redirect, message } = nextProps.location.state
    //   this.setState({
    //     redirect: redirect,
    //     message: message,
    //   },() => console.log(this.state))
    // } else {
    //   this.setState({
    //     redirect: false,
    //     message: "",
    //   })
    // }
  }

  render() {
    const { deckResults, currentUserDecks } = this.props
    const { userPage, message } = this.state
    const deckResultsCards = deckResults.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={false}/>)
    const currentUserDecksCards = currentUserDecks.map(deck => <DeckCard key={uuid()} deck={deck.attributes} user={true}/>)
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
          { ((!userPage && !deckResults.length) || (userPage && !currentUserDecks.length)) && (
            <Message attached>
              <Message.Header content={userPage ? 'No decks yet' :  'No decks found'} />
            </Message>
          )}
          <Card.Group centered>
            {userPage ? currentUserDecksCards : deckResultsCards}
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
  }
}

export default connect(mapStateToProps, { fetchUser })(withLoader(DeckContainer))
