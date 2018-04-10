import React, { Component } from 'react'
import withLoader from './hocs/withLoader'
import uuid from 'uuid'
import CardSegment from './CardSegment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react'


class DeckShow extends Component {

  state = {
    redirect: false,
  }

  goBack = (event) => {
    this.props.history.goBack()
  }

  render() {
    const mainboard = this.props.selectedDeck.mainboardCards.map(card => <CardSegment key={uuid()} card={card} />)
    const sideboard = this.props.selectedDeck.mainboardCards.map(card => <CardSegment key={uuid()} card={card} />)
    return (
      <Container>
        <Button onClick={this.goBack}>Return to Search Results</Button>
        <Grid columns={2} divided>
          <Grid.Column width={12}>
            <Segment.Group>
              <Segment as={Header} content='Mainboard' />
              <Segment.Group content={mainboard} compact/>
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
  console.log(state.decks.selected);
  return {
    selectedDeck: state.decks.selected,
    loading: state.decks.loading,
  }
}

export default withRouter(connect(mapStateToProps)(DeckShow))

// <Container>
//   <Grid columns={countCardTypes}>
//     <Grid.Row>
//     </Grid.Row>
//   </Grid>
// </Container>
//
