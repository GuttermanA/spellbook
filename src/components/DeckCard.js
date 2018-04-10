import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectDeck } from '../actions/decks'
import { Card, List, Icon } from 'semantic-ui-react'
import { dateFormater } from '../globalFunctions'

class DeckCard extends Component {

  handleClick = (event) => {
    this.props.selectDeck(this.props.deck, this.props.history, this.props.user)
  }

  shouldComponentUpdate(nextProps) {
      // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(this.props);
    var bProps = Object.getOwnPropertyNames(nextProps);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return true;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (this.props[propName] !== nextProps[propName]) {
            return true;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return false;
  }

  render() {
    const {
      name,
      creator,
      archtype,
      // totalCards,
      // mainboard,
      // sideboard,
      tournament,
      // createdAt,
      updatedAt,
      format,
      id,
    } = this.props.deck
    // const mainboardCards = this.props.mainboardCards
    // const sideboardCards = this.props.sideboardCards
    // const user = this.props.user
    const { currentUser } = this.props
    return (
      <Card>
        <Card.Content>

          <Card.Header as={Link} to={this.props.user ? `/${currentUser.name}/decks/${id}` : `/decks/${id}`} content={name} floated='left' onClick={this.handleClick}/>
          <Card.Meta content={creator}/>
          <List>
            <List.Item>
              <List.Header>Archtype</List.Header>
              {archtype}
            </List.Item>
            <List.Item>
              <List.Header>Format</List.Header>
              {format}
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          {tournament ? (<Icon name='trophy' corner/>) : null}
          {dateFormater(updatedAt)}
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { selectDeck })(withRouter(DeckCard))
