import React, { Component } from 'react';
import MagicCard from '../components/MagicCard'
import uuid from 'uuid'
import { connect } from 'react-redux'
import withPusher from '../components/hocs/withPusher'
import { fetchCards } from '../actions/cards'
import { Card, Message, } from 'semantic-ui-react'


class CardContainer extends Component {

  state = {
    collection: false,
  }

  componentDidMount() {
    if (this.props.match.path === '/:username/collection') {
      this.setState({ collection: true })
    } else if (!this.props.results.length && !this.props.loading) {
      this.props.fetchCards({term: "default"}, this.props.history)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.path === '/:username/collection') {
      return {
        collection: true
      }
    } else {
      return {
        collection: false
      }
    }
  }

  render() {
    const { pusherVisible, pusherType } = this.props
    let cards
    if (this.state.collection) {
      cards = this.props.collection.map(card => <MagicCard key={uuid()} card={card.attributes} type={card.type} pusherVisible={pusherVisible} pusherType={pusherType}/>)
    } else {
      cards = this.props.results.map(card => <MagicCard key={uuid()} card={card.attributes} type={card.type} pusherVisible={pusherVisible} pusherType={pusherType}/>)
    }

    // return(
    //   <Container fluid>
    //     { !cards.length && (
    //       <Message>
    //         <Message.Header content='No cards found' />
    //       </Message>
    //     )}
    //     <Card.Group centered>
    //       {cards}
    //     </Card.Group>
    //   </Container>
    // )

    if (cards.length) {
      return (
        <Card.Group centered={true}>
          {cards}
        </Card.Group>

      )
    } else {
        return (
          <Message>
            <Message.Header content='No cards found' />
          </Message>
        )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.cards.results,
    loading: state.cards.loading,
    collection: state.auth.currentUserCollection,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default connect(mapStateToProps, { fetchCards })(withPusher(CardContainer))
