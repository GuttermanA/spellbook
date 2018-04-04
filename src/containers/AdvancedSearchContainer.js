import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'
import DeckSearchForm from '../components/DeckSearchForm'
import CardSearchForm from '../components/CardSearchForm'

export default class AdvancedSearchContainer extends Component {

  state = {
    activeItem: 'cardSearch'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Container>
        <Button.Group>
          <Button name='cardSearch' active={ activeItem === 'cardSearch'} onClick={this.handleItemClick}>Card Search</Button>
          <Button name='deckSearch' active={ activeItem === 'deckSearch'} onClick={this.handleItemClick}>Deck Search</Button>
        </Button.Group>
        {this.state.activeItem === 'cardSearch' ? <CardSearchForm/> : <DeckSearchForm/>}
      </Container>
    )
  }
}
