import React, { Component } from 'react'
// import uuid from 'uuid'
// import CardSegment from './CardSegment'
import { types } from '../globalVars'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react'

// const reduceBy = (cards, cardType) => {
//   return (
//     cards.reduce((allCards, card) =>{
//       if (card.attributes.fullType.includes(cardType)) {
//         allCards.push(<CardSegment key={uuid()} card={card.attributes} />)
//       }
//       return allCards
//     }, [])
//   )
// }

class DeckShow extends Component {

  state = {
    redirect: false,
    mainboard: {},
    sideboard: [],
  }

  goBack = (event) => {
    this.props.history.goBack()
  }

  componentDidMount = () => {
    // this.props.selectedDeck.mainboardCards.data.reduce(all, card) => {
    //   switch (card.attributes.fullType) {
    //     case expression:
    //
    //       break;
    //     default:
    //
    const { mainboardCards, sideboardCards } = this.props.selectedDeck
    for (const type of mainboardCards.data) {
      debugger
      this.setState({
        mainboard: {
          ...this.state.mainboard,
          [type]: mainboardCards.data[types],
        }
      },()=> console.log(this.state))
      // switch (true) {
      //   case card.attributes.fullType.includes('Creature'):
      //     this.setState({creatures: [...this.state.creatures, <CardSegment key={uuid()} card={card.attributes} />]})
      //     break;
      //   case card.attributes.fullType.includes('Instant'):
      //     this.setState({instants: [...this.state.instants, <CardSegment key={uuid()} card={card.attributes} />]})
      //     break;
      //   case card.attributes.fullType.includes('Sorcery'):
      //     this.setState({sorceries: [...this.state.sorceries, <CardSegment key={uuid()} card={card.attributes} />]})
      //     break;
      //   case card.attributes.fullType.includes('Land'):
      //     this.setState({lands: [...this.state.lands, <CardSegment key={uuid()} card={card.attributes} />]})
      //     break;
      //   case card.attributes.fullType.includes('Artifact'):
      //     this.setState({artifacts: [...this.state.artifacts, <CardSegment key={uuid()} card={card.attributes} />]})
      //     break;
      //   case card.attributes.fullType.includes('Enchantment'):
      //     this.setState({enchantments: [...this.state.enchantments, <CardSegment key={uuid()} card={card.attributes} />]})
      //     break;
      //   case card.attributes.fullType.includes('Planeswalker'):
      //     this.setState({planeswalkers: [...this.state.planeswalkers, <CardSegment key={uuid()} card={card.attributes} />]})
      //     break;
      //   default:
      //     console.log('Cannot determine card type', card);
      // }
    }
    const sideboard  = sideboardCards.data.map(card => card.attributes)
    this.setState({ sideboard })
  }

  render() {
    const {
      // creatures,
      // instants,
      // sorceries,
      // lands,
      // artifacts,
      // enchantments,
      // planeswalkers,
      sideboard
    } = this.state
    // let mainboard = []
    // let sideboard = []
      // for(let key in this.state) {
      //   if (Array.isArray(this.state[key] && key !== 'sideboard' && this.state[key].length)) {
      //     mainboard.push(
      //       <Segment.Group>
      //         <Segment as={Header} content={key}/>
      //         {this.state[key]}
      //       </Segment.Group>
      //     )
      //   }
      // }
    // const mainboard = this.props.selectedDeck.mainboardCards.data.map(card => <CardSegment key={uuid()} card={card.attributes} />)
    // const sideboard = this.props.selectedDeck.sideboardCards.data.map(card => <CardSegment key={uuid()} card={card.attributes} />)
    return (
      <Container>
        <Button onClick={this.goBack}>Return to Search Results</Button>
        <Grid columns={2} divided>
          <Grid.Column width={12}>
            <Segment.Group>
              <Segment as={Header} content='Mainboard' />

            </Segment.Group>

          </Grid.Column>
          <Grid.Column width={4}>
            <Segment.Group>
              <Segment as={Header} content='Sideboard' />
              <Segment.Group content={sideboard} compact/>
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Container>


    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decks.selected,
    loading: state.decks.loading,
  }
}
// { this.state.creatures.length && (
//   <Segment.Group compact>
//     <Segment as={Header} content='Creatures'/>
//     {this.state.creatures}
//   </Segment.Group>
// )}


export default withRouter(connect(mapStateToProps)(DeckShow))
