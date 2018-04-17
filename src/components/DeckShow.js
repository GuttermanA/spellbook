import React, { Component } from 'react'
import uuid from 'uuid'
import CardSegment from './CardSegment'
import SegmentList from './SegmentList'
import withLoader from './hocs/withLoader'
import { types } from '../globalVars'
import { withRouter } from 'react-router-dom'
import { fetchDeck } from  '../actions/decks'
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
    if (!Object.keys(this.props.selectedDeck).length) {
      this.props.fetchDeck(this.props.match.params.id)
    } else {
      console.log('mountingSelectedDeck',this.props.selectedDeck);
      const mainboard = this.props.selectedDeck.cards.mainboard
      const sideboard = this.props.selectedDeck.cards.sideboard

      for (const type in mainboard) {
        this.setState({
          mainboard: {
            ...this.state.mainboard,
            [type]: mainboard[type],
          }
        })
      }
      this.setState({ sideboard })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (Object.keys(this.props.selectedDeck).length) {
  //
  //     const mainboard = nextProps.selectedDeck.cards.mainboard
  //     const sideboard = nextProps.selectedDeck.cards.sideboard
  //     console.log('nextSelectedDeck',nextProps.selectedDeck);
  //     for (const type in mainboard) {
  //       this.setState({
  //         mainboard: {
  //           ...this.state.mainboard,
  //           [type]: mainboard[type],
  //         }
  //       })
  //     }
  //     this.setState({ sideboard })
  //   }
  // }

  render() {
    const {
      sideboard,
      mainboard,
    } = this.state

    const mainboardSegments = (() => {
      const segments = []
      for(const type in mainboard) {
        segments.push(<SegmentList key={uuid()} cards={mainboard[type]} type={type}/>)
      }
      return segments
    })()

    const sideboardSegments = sideboard.map(card => <CardSegment key={uuid()} card={card} />)
    return (
      <Container>
        <Button onClick={this.goBack}>Return to Search Results</Button>
        <Grid columns={2} divided>
          <Grid.Column width={12}>
            <Segment.Group>
              <Segment as={Header} content='Mainboard' />
              {mainboardSegments}
            </Segment.Group>

          </Grid.Column>
          <Grid.Column width={4}>
            <Segment.Group>
              <Segment as={Header} content='Sideboard' />
              <Segment.Group content={sideboardSegments} compact/>
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

export default withRouter(connect(mapStateToProps, { fetchDeck })(withLoader(DeckShow)))
