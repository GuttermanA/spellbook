import React, { Component } from 'react';
import MagicCard from '../components/MagicCard'
import uuid from 'uuid'
import { connect } from 'react-redux'
import withPusher from '../components/hocs/withPusher'
import { Container, Card, Message } from 'semantic-ui-react'


class CardContainer extends Component {

  render() {
    const { pusherVisible, pusherType } = this.props
    const cards = this.props.results.map(card => <MagicCard key={uuid()} card={card.attributes} type={card.type} pusherVisible={pusherVisible} pusherType={pusherType}/>)
    return (
      <Container>
        { cards.length ? (
          <Card.Group centered={!pusherVisible}>
            {cards}
          </Card.Group>
        ): (
          <Message>
            <Message.Header content='No cards found' />
          </Message>
        )}
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.cards.results,
    loading: state.cards.loading,
  }
}

export default connect(mapStateToProps)(withPusher(CardContainer))
