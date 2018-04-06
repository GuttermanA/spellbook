import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'


class Deck extends Component {


  render() {
    console.log(this.props)
    return (
      <div>
        <p>decks page</p>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decks.selected
  }
}

export default connect(mapStateToProps)(Deck)

// <Container>
//   <Grid columns={countCardTypes}>
//     <Grid.Row>
//     </Grid.Row>
//   </Grid>
// </Container>
//
