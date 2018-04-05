import React, { Component } from 'react';
import Card from '../components/Card'
import { connect } from 'react-redux'
import withLoader from '../components/hocs/withLoader'
import withBuilder from '../components/hocs/withBuilder'
import { Container } from 'semantic-ui-react'


class CardContainer extends Component {

  render() {
    const cards = this.props.results.map(card => <Card key={card.multiverse_id} card={card}/>)
    return (
      <Container>
        <div className="card-list">
          {!this.props.results.length ? <p>No cards found</p> : cards}
        </div>
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

export default connect(mapStateToProps)(withLoader(withBuilder(CardContainer)))
