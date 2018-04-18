import React, { Component } from 'react';
import MagicCard from '../components/MagicCard'
import uuid from 'uuid'
import { connect } from 'react-redux'
import withPusher from '../components/hocs/withPusher'
import { Container, Card, Message } from 'semantic-ui-react'


class CardContainer extends Component {

  state = {
    collection: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state.collection) {
      this.setState({ collection: true })
    } else {
      this.setState({ collection: false })
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

    return (
      <div >
        { cards.length ? (
          <Card.Group centered>
            {cards}
          </Card.Group>

        ): (
          <Message>
            <Message.Header content='No cards found' />
          </Message>
        )}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.cards.results,
    loading: state.cards.loading,
    collection: state.auth.currentUserCollection,
  }
}

export default connect(mapStateToProps)(withPusher(CardContainer))
