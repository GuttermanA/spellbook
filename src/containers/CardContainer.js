import React, { Component } from 'react';
import MagicCard from '../components/MagicCard'
import uuid from 'uuid'
import { connect } from 'react-redux'
import withBuilder from '../components/hocs/withBuilder'
import { Container, Image } from 'semantic-ui-react'


class CardContainer extends Component {

  render() {
    const cards = this.props.results.map(card => <MagicCard key={uuid()} card={card.attributes}/>)
    const style = {
      minHeight: '500px',
      flexWrap: 'wrap',
      display: 'flex'
    }
    return (
        <Image.Group as={Container} style={style} >
          {!this.props.results.length ? <p>No cards found</p> : cards}
        </Image.Group>
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
