import React, { Component } from 'react'

class DeckEditForm extends Component {
  state = {
    cards: this.props.cards,
  }



  handleCardChange = (event, card) => {
    const { name, id, value } = event.target
    const updatedCard = {...card, [name]: value}
    this.setState({
      update: {
        ...this.state.update,
        cards: [...this.state.cards, updatedCard]
      }
    },()=> console.log(this.state.fields.cards))
  }
}

export default DeckEditForm
