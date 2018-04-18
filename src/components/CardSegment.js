import React, { Component } from 'react'
import DeckCardInput from './DeckCardInput'
import { Segment, Popup, Image } from 'semantic-ui-react'


class CardSegment extends Component {

  state = { isOpen: false }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { count, name, img_url } = this.props.card
    const segment = (
      <Segment>
        <a>{`${count} ${name}`}</a>
      </Segment>
    )
    if (this.props.editing) {
      return (
        <Segment>
          <DeckCardInput />
        </Segment>
      )
    } else {
      return (
        <Popup
          trigger={segment}
          position='right center'
          on='hover'
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          <Image src={img_url} />
        </Popup>

      )
    }

  }

}

export default CardSegment
// <Popup
//   trigger={segment}
//   position='right center'
//   on='hover'
//   open={this.state.isOpen}
//   onClose={this.handleClose}
//   onOpen={this.handleOpen}
// >
//   <Image src={img_url} />
// </Popup>
