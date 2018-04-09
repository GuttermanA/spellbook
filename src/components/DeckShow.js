import React, { Component } from 'react'
import withLoader from './hocs/withLoader'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'


class Deck extends Component {

  goBack = (event) => {
    this.props.history.goBack()
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Button onClick={this.goBack}>Return to Search Results</Button>
        <p>decks page</p>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decks.selected,
    loading: state.decks.loading
  }
}

export default withRouter(connect(mapStateToProps)(withLoader(Deck)))

// <Container>
//   <Grid columns={countCardTypes}>
//     <Grid.Row>
//     </Grid.Row>
//   </Grid>
// </Container>
//
