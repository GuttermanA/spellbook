import React, { Component } from 'react';
import uuid from 'uuid'
import MagicCard from '../components/MagicCard'
import { connect } from 'react-redux'
import withPusher from '../components/hocs/withPusher'
import { Container, Image, Message, Card } from 'semantic-ui-react'

class CollectionContainer extends Component {

  render() {
    console.log(this.props.loading);
    const { pusherVisible, pusherType } = this.props
    const collection = this.props.collection.map(card => <MagicCard key={uuid()} card={card.attributes} type={card.type} pusherVisible={pusherVisible} pusherType={pusherType}/>)
    return (
      <Container>
        { collection.length ? (
          <Card.Group centered={!pusherVisible}>
            {collection}
          </Card.Group>
        ): (
          <Message>
            <Message.Header content='No cards yet' />
          </Message>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    collection: state.auth.currentUserCollection,
    loading: state.auth.loading,
  }
}


export default connect(mapStateToProps)(withPusher(CollectionContainer))
