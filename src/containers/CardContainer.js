import React, { Component } from 'react';
import MagicCard from '../components/MagicCard'
import uuid from 'uuid'
import { connect } from 'react-redux'
import withBuilder from '../components/hocs/withBuilder'
import { Container, Image, Message } from 'semantic-ui-react'


class CardContainer extends Component {

  render() {
    const cards = this.props.results.map(card => <MagicCard key={uuid()} card={card.attributes} pusherVisible={this.props.pusherVisible}/>)
    const style = {
      minHeight: '500px',
      flexWrap: 'wrap',
      display: 'flex'
    }
    return (
      <Container>
        { cards.length ? (
          <Image.Group style={style} >
            {cards}
          </Image.Group>
        ): (
          <Message>
            <Message.Header content='No cards found' />
          </Message>
        )}
        <Image.Group style={style} >
          {cards}
        </Image.Group>
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

export default connect(mapStateToProps)(withBuilder(CardContainer))
