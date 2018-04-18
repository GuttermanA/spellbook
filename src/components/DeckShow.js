import React, { Component } from 'react'
import uuid from 'uuid'
import CardSegment from './CardSegment'
import SegmentList from './SegmentList'
import withLoader from './hocs/withLoader'
import { types } from '../globalVars'
import { withRouter, Redirect } from 'react-router-dom'
import { fetchDeck, deleteDeck } from  '../actions/decks'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header, Segment, Label, Form } from 'semantic-ui-react'

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
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      userDeck: false,
      editing: true,
      mainboard: {},
      sideboard: [],
      cardsToUpdate: [],
      cardsToDelete: [],
    }
    this.cardsToUpdate = []
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  // state = {
  //   redirect: false,
  //   userDeck: false,
  //   editing: true,
  //   mainboard: {},
  //   sideboard: [],
  //   cardsToUpdate: [],
  //   cardsToDelete: [],
  // }

  goBack = (event) => {
    this.props.history.goBack()
  }

  handleDelete = (event) => {
    this.setState({ redirect: true }, () => this.props.deleteDeck(this.props.selectedDeck.id, this.props.history, this.props.currentUser))
  }

  handleEdit = (event) => {
    debugger
    this.setState({ editing: !this.state.editing })
  }

  handleChange = (event, cardRef) => {
    debugger
    const { value, name } = event.target
    let found = this.cardsToUpdate.find(card => card.id === cardRef.id && card.sideboard === cardRef.sideboard)
    if (found) {
      found[name] = value
    } else {
      this.cardsToUpdate.push({...cardRef, [name]: value})
    }
    console.log(this.cardsToUpdate);
    // this.setState({
    //   cardsToUpdate: [...this.state.cardsToUpdate, {...card, [name]: value}]
    // }, ()=> console.log(this.state.cardsToUpdate))
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateDeck(this.cardsToUpdate, this.cardsToDelete)
    this.setState({
      editing: false
    })
  }

  handleDelete(event, cardRef) {
    let found = this.cardsToUpdate.find(card => card.id === cardRef.id && card.sideboard === cardRef.sideboard)
    if (!found) {
      this.cardsToDelete.push(cardRef)
    }
    console.log(this.cardsToDelete);
  }



  componentDidMount = () => {
    if (!Object.keys(this.props.selectedDeck).length) {
      this.props.fetchDeck(this.props.match.params.id)
    } else {
      console.log('mountingSelectedDeck',this.props.selectedDeck);
      const mainboard = this.props.selectedDeck.cards.mainboard
      for(const type in mainboard) {
        type: mainboard[type].map(card => card.key = uuid())
      }
      const sideboard = this.props.selectedDeck.cards.sideboard.map(card => card.key = uuid())
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
      editing,
    } = this.state
    const { name, archtype, totalMainboard, totalSideboard, tournament, updatedAt } = this.props.selectedDeck
    const mainboardSegments = (() => {
      const segments = []
      for(const type in mainboard) {
        segments.push(<SegmentList handleChange={this.handleChange} key={uuid()} editing={this.state.editing} cards={mainboard[type]} type={type} board='mainboard'/>)
      }
      return segments
    })()
    const sideboardSegments = sideboard.map(card => <CardSegment key={card.key} card={card} board='sideboard'/>)

    if (redirect) {
      return <Redirect exact to={`/${this.props.currentUser.name}/decks`} />
    } else {
      return (
        <Container>
          <Button.Group >
            <Button name='goBack' onClick={this.goBack}>Return to Search Results</Button>
            <Button name='edit' onClick={this.handleEdit}>{userDeck ? 'Edit' : 'Copy and Edit'}</Button>
            { userDeck && <Button name='delete' onClick={this.handleDelete}>Delete</Button>}

          </Button.Group>
          <Segment.Group  horizontal>
            <Segment>
              { tournament  && <Label icon='trophy'/>}
              Name: {name}
            </Segment>
            <Segment>
              Archtype: {archtype}
            </Segment>
          </Segment.Group>
          <Grid as={Form} columns={2} divided size='mini' >
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
            { editing && <Button onClick={this.handleSubmit}>Update</Button>}
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
