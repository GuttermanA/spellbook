import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import { connect } from 'react-redux'
import { selectDeck, deleteDeck } from '../actions/decks'
import { Card, List, Icon, Label } from 'semantic-ui-react'
import { dateFormater } from '../globalFunctions'

class DeckCard extends Component {

  state = {
    destroy: false,
    mouseOver: false,
  }

  handleMouseOver = (event) => {
    this.setState({
      mouseOver: !this.state.mouseOver
    })
  }

  toggleDestroyModal = () => {
    this.setState({
      destroy: !this.state.destroy
    })
  }

  handleClick = (event) => {
    this.props.selectDeck(this.props.deck, this.props.history, this.props.currentUser)
  }

  handleDelete = (event) => {
    this.props.deleteDeck(this.props.deck.id, this.props.history, this.props.currentUser)
  }

  render() {
    console.log(this.props);
    const {
      name,
      userName,
      creator,
      archtype,
      // totalCards,
      // mainboard,
      // sideboard,
      tournament,
      // createdAt,
      updatedAt,
      formatName,
      // id,
    } = this.props.deck
    // const { currentUser } = this.props
    return (
      <Card  className='magic-card' onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver}>
        <Card.Content>
          <Card.Header as='a' floated='left' onClick={this.handleClick} className="white-text">
            { tournament  && <Icon name='trophy'/>}
            { name }
          </Card.Header>
          <Card.Meta className="white-text">
            <i>{ userName === 'admin' ? creator : userName}</i>
          </Card.Meta>
          <List>
            <List.Item>
              <List.Header className="white-text">Archtype</List.Header>
              {archtype}
            </List.Item>
          <br/>
            <List.Item>
              <List.Header className="white-text">Format</List.Header>
              {formatName}
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra className="white-text">
          {dateFormater(updatedAt)}
          {this.props.match.path === "/:username/decks" && this.state.mouseOver && <Label as='a' name='delete' onClick={this.toggleDestroyModal} attached='top right' icon='delete'/>}
        </Card.Content>
        <DeleteModal open={this.state.destroy} handleDelete={this.handleDelete} toggle={this.toggleDestroyModal} type='deck'/>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { selectDeck, deleteDeck })(withRouter(DeckCard))
