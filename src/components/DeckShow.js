import React, { Component } from 'react'
import uuid from 'uuid'
import CardSegment from './CardSegment'
import SegmentList from './SegmentList'
import withLoader from './hocs/withLoader'
import { types } from '../globalVars'
import { withRouter, Redirect } from 'react-router-dom'
import { fetchDeck, deleteDeck } from  '../actions/decks'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header, Segment, Label } from 'semantic-ui-react'

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
    userDeck: false,
    editing: false,
    mainboard: {},
    sideboard: [],
  }

  goBack = (event) => {
    this.props.history.goBack()
  }

  handleDelete = (event) => {
    this.setState({ redirect: true }, () => this.props.deleteDeck(this.props.selectedDeck.id, this.props.history, this.props.currentUser))
  }

  componentDidMount = () => {
    if (!Object.keys(this.props.selectedDeck).length) {
      this.props.fetchDeck(this.props.match.params.id)
    } else {
      console.log('mountingSelectedDeck',this.props.selectedDeck);
      const mainboard = this.props.selectedDeck.cards.mainboard
      const sideboard = this.props.selectedDeck.cards.sideboard
      if (this.props.match.params.username) {
        this.setState({ sideboard, mainboard, userDeck: true })
      } else {
        this.setState({ sideboard, mainboard, userDeck: false })
      }

    }
  }

  render() {
    const {
      sideboard,
      mainboard,
      userDeck,
      redirect,
    } = this.state
    const { name, archtype, totalMainboard, totalSideboard, tournament, updatedAt } = this.props.selectedDeck
    const mainboardSegments = (() => {
      const segments = []
      for(const type in mainboard) {
        segments.push(<SegmentList key={uuid()} editing={this.state.editing} cards={mainboard[type]} type={type}/>)
      }
      return segments
    })()
    const sideboardSegments = sideboard.map(card => <CardSegment key={uuid()} card={card} />)

    if (redirect) {
      return <Redirect exact to={`/${this.props.currentUser.name}/decks`} />
    } else {
      return (
        <Container>
          <Button.Group >
            <Button name='goBack' onClick={this.goBack}>Return to Search Results</Button>
            <Button name='edit'>{userDeck ? 'Edit' : 'Copy and Edit'}</Button>
            { userDeck && <Button name='delete' onClick={this.handleDelete}>Delete</Button>}
          </Button.Group>
          <Segment.Group horizontal>
            <Segment>
              { tournament  && <Label icon='trophy'/>}
              Name: {name}
            </Segment>
            <Segment>
              Archtype: {archtype}
            </Segment>
          </Segment.Group>
          <Grid columns={2} divided>
            <Grid.Column width={12}>
              <Segment.Group>
                <Segment as={Header} content={`Mainboard (${totalMainboard})`} />
                {mainboardSegments}
              </Segment.Group>

            </Grid.Column>
            <Grid.Column width={4}>
              <Segment.Group>
                <Segment as={Header} content={`Sideboard (${totalSideboard})`} />
                <Segment.Group content={sideboardSegments} compact/>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        </Container>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decks.selected,
    loading: state.decks.loading,
    currentUser: state.auth.currentUser,
  }
}

export default withRouter(connect(mapStateToProps, { fetchDeck, deleteDeck })(withLoader(DeckShow)))
