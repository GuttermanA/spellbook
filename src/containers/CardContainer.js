import React, { Component } from 'react';
import Card from '../components/Card'
import uuid from 'uuid'
import { connect } from 'react-redux'
import withBuilder from '../components/hocs/withBuilder'
import { Container } from 'semantic-ui-react'


class CardContainer extends Component {

  render() {
    const cards = this.props.results.map(card => <Card key={uuid()} card={card.attributes}/>)
    const style = {
      minHeight: '500px'
    }
    return (
        <Container style={style} fluid>
          {!this.props.results.length ? <p>No cards found</p> : cards}
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
