import React, { Component } from 'react'
import uuid from 'uuid'
import SegmentList from './SegmentList'
import DeleteModal from './DeleteModal'
import withLoader from './hocs/withLoader'
import { keysForDeckShow } from '../globalVars'
import { sortCardsByType, dateFormater } from '../globalFunctions'
import { withRouter, Redirect } from 'react-router-dom'
import { fetchDeck, deleteDeck, updateDeck, deleteFromDeck, createDeck } from  '../actions/decks'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header, Segment, Form, Icon } from 'semantic-ui-react'

class DeckShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      userDeck: false,
      editing: false,
      destroy: false,
      deck: {},
      deckCopy: {},
      segmentCount: 0,
      validation: {
        error: false,
        message: "",
      },
    }
    this.cardsToUpdate = []
    this.cardsToDelete = []
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount = () => {
    if (!Object.keys(this.props.selectedDeck).length) {
      this.props.fetchDeck(this.props.match.params.id)
      if (this.props.match.path === '/:username/decks/:id') {
        this.setState({userDeck: true})
      }
    }
    if (this.props.match.path === '/:username/decks/:id') {
      this.setState({userDeck: true})
    }

    // else {
    //   console.log('mountingSelectedDeck',this.props.selectedDeck);
    //   const mainboard = this.props.selectedDeck.cards.mainboard
    //   for(const type in mainboard) {
    //     mainboard[type].map(card => card.key = uuid())
    //   }
    //   const sideboard = this.props.selectedDeck.cards.sideboard.map(card => {return {...card, key: uuid()}})
    //   if (this.props.match.params.username) {
    //     this.setState({ sideboard, mainboard, userDeck: true })
    //   } else {
    //     this.setState({ sideboard, mainboard, userDeck: false })
    //   }
    //
    // }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.segmentCount && Object.keys(nextProps.selectedDeck).length) {
      const mainboardSegments = nextProps.selectedDeck.cards.filter(card => !card.sideboard).length
      const uniqCardTypes = [...new Set(nextProps.selectedDeck.cards.map(card => card.primary_type))].length
      const cardsWithKeys = nextProps.selectedDeck.cards.map(card => {
        card.key = uuid()
        card.error = false
        return card
      })
      console.log(uniqCardTypes);
      return {
        segmentCount: mainboardSegments + uniqCardTypes,
        deck: {...nextProps.selectedDeck, cards: cardsWithKeys},
        deckCopy: {...nextProps.selectedDeck, cards: cardsWithKeys},
      }
    }

    if (nextProps.deckError) {
      const cards = prevState.deck.cards.map(card => {
        if (nextProps.deckErrorRes.keys.includes(card.key) ) {
          card.error = true
        }
        return card
      })

      return {
        validation: {
          error: true,
          message: nextProps.deckErrorRes.message
        },
        deck: {...prevState.deck, cards}
      }
    }
    return null
  }

  handleDelete = (event) => {
    this.setState({ redirect: true }, () => this.props.deleteDeck(this.props.selectedDeck.id, this.props.history, this.props.currentUser))
  }

  handleEdit = (event) => {
    if (this.state.editing) {
      this.setState({ editing: !this.state.editing, deck: this.state.deckCopy })
    } else {
      this.setState({ editing: !this.state.editing })
    }
  }

  handleCopy = (event) => {
    const copy = true
    this.props.createDeck(this.state.deck, this.props.history, copy)
  }

  toggleDestroyModal = () => {
    this.setState({
      destroy: !this.state.destroy
    })
  }

  handleChange = (event, cardRef) => {
    const { value, name } = event.target
    let found = this.cardsToUpdate.find(card => card.key === cardRef.key)
    if (found) {
      found[name] = value
    } else {
      this.cardsToUpdate.push({...cardRef, [name]: value})
    }
    console.log('cards to edit', this.cardsToUpdate);
  }

  handleSubmit(event) {
    event.preventDefault()
    if (JSON.stringify(this.state.deck) !== JSON.stringify(this.state.deckCopy) ) {
      this.props.updateDeck(this.state.deck)
      this.setState({
        editing: false
      })
    } else {
      alert('No changes made, submission canceled')
    }
  }

  appendInput = (event, { name }) => {
    event.preventDefault()
    const sideboard = name === 'sideboard'
    const cards = this.state.deck.cards
    if (cards.length <= 100) {
      this.setState({
        deck: {...this.state.deck ,cards: [...this.state.deck.cards, {key:uuid(), error: false, primary_type: name, sideboard, name:"", count: "" }]}
      },()=>console.log(this.state.deck.cards.length))
    } else {
      alert("Max cards reached")
    }
  }

  handleCardChange = (event, { name, id, value }) => {
    const cards = this.state.deck.cards.map((card) => {
      if (card.key === id) {
        card[name] = value
      }
      return card
    })
    this.setState({
      deck: {...this.state.deck, cards}
    })
  }

  removeInput = (event) => {
    event.preventDefault()
    const { id } = event.target
    const cards = this.state.deck.cards.filter(card => card.key !== id)
    this.setState({
      deck: {...this.state.deck, cards}
    })
  }



  render() {
    const { loggedIn, history } = this.props
    const {
      destroy,
      userDeck,
      redirect,
      editing,
    } = this.state

    const {
      name,
      archtype,
      totalMainboard,
      totalSideboard,
      tournament,
      cards,
      creator,
      userName,
      formatName,
      updatedAt,
    } = this.state.deck
    const mainboardSegments = (() => {
      if (cards) {
        const segments = []
        const mainboard = cards.filter(card => !card.sideboard)
        const sortedCards = sortCardsByType(mainboard)
        for(const cardType in sortedCards) {
          segments.push(
            <SegmentList
              appendInput={this.appendInput}
              removeInput={this.removeInput}
              handleCardChange={this.handleCardChange}
              key={keysForDeckShow[cardType]}
              editing={this.state.editing}
              cards={sortedCards[cardType]}
              type={cardType}
              board='mainboard'
            />
          )
        }
        return segments.sort((a,b) => b.props.cards.length - a.props.cards.length )
      }
    })()
    const sideboardSegment =  (() =>{
      if (cards) {
        const sideboard = cards.filter(card => card.sideboard)
        return (
          <SegmentList
            appendInput={this.appendInput}
            removeInput={this.removeInput}
            handleCardChange={this.handleCardChange}
            totalsideboard={totalSideboard}
            key={keysForDeckShow.Sideboard}
            editing={this.state.editing}
            cards={sideboard}
            type='sideboard'
            board='sideboard'
          />
        )
      }
    })()

    console.log('segmentCount', this.state.segmentCount);

    if (redirect) {
      return <Redirect exact to={`/${this.props.currentUser.name}/decks`} />
    } else {
      return (
        <Container>
          <Button.Group >
            <Button  name='edit' onClick={history.goBack}>{userDeck ? 'Return to Decks' : 'Return to Results'}</Button>
            { loggedIn && !editing && userDeck && <Button  name='edit' onClick={this.handleEdit}>Edit</Button>}
            { loggedIn && !editing && !userDeck && <Button  name='copy' onClick={this.handleCopy}>Copy</Button>}
            { loggedIn && editing && <Button  name='cancel' onClick={this.handleEdit}>Cancel</Button>}
            { userDeck && !editing && <Button  name='delete' onClick={this.toggleDestroyModal}>Delete</Button>}
            { editing && <Button  onClick={this.handleSubmit}>Update</Button>}
          </Button.Group>
          <Segment.Group  horizontal>
            <Segment>
              { tournament  && <Icon name='trophy'/>}
              <b>Name:</b> {name}
            </Segment>
            <Segment>
              <b>Creator:</b> {userName !== 'admin' ? userName : creator}
            </Segment>
            <Segment>
              <b>Format:</b> {formatName}
            </Segment>
            <Segment>
              <b>Archtype:</b> {archtype}
            </Segment>
            <Segment>
              <b>Last Updated:</b> {dateFormater(updatedAt)}
            </Segment>
          </Segment.Group >
          <Grid as={Form} columns={2} divided size='mini' >
            <Grid.Column width={11}>
              <Segment  as={Header} content={`Mainboard (${totalMainboard})`} />
              <div id={
                  (this.state.segmentCount <= 26 && 'deck-container-small') ||
                  (this.state.segmentCount > 38 && 'deck-container-large') ||
                  'deck-container-mid'
                }
              >
                {
                  // { mainboard.lands && <SegmentList handleRemoveEdit={this.handleRemoveEdit} handleChange={this.handleChange} key={uuid()} editing={this.state.editing} cards={mainboard.lands} type="lands" board='mainboard'/>}
                  //
                  // { mainboard.instants && <SegmentList handleRemoveEdit={this.handleRemoveEdit} handleChange={this.handleChange} key={uuid()} editing={this.state.editing} cards={mainboard.instants} type="instants" board='mainboard'/>}
                  // { mainboard.sorceries && <SegmentList handleRemoveEdit={this.handleRemoveEdit} handleChange={this.handleChange} key={uuid()} editing={this.state.editing} cards={mainboard.sorceries} type="sorceries" board='mainboard'/>}
                  // { mainboard.artifacts && <SegmentList handleRemoveEdit={this.handleRemoveEdit} handleChange={this.handleChange} key={uuid()} editing={this.state.editing} cards={mainboard.artifacts} type="artifacts" board='mainboard'/>}
                  // { mainboard.enchantments && <SegmentList handleRemoveEdit={this.handleRemoveEdit} handleChange={this.handleChange} key={uuid()} editing={this.state.editing} cards={mainboard.enchantments} type="enchantments" board='mainboard'/>}
                  // { mainboard.planeswalkers && <SegmentList handleRemoveEdit={this.handleRemoveEdit} handleChange={this.handleChange} key={uuid()} editing={this.state.editing} cards={mainboard.planeswalkers} type="planeswalkers" board='mainboard'/>}

                }
                {
                  mainboardSegments
                }
              </div>

            </Grid.Column>
            <Grid.Column width={5}>
              <Segment  as={Header} content={`Sideboard (${totalSideboard})`} />
                {sideboardSegment}
            </Grid.Column>

          </Grid>

          <DeleteModal open={destroy} handleDelete={this.handleDelete} toggle={this.toggleDestroyModal} type='deck'/>

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
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default withRouter(connect(mapStateToProps, { fetchDeck, deleteDeck, updateDeck, deleteFromDeck, createDeck })(withLoader(DeckShow)))
