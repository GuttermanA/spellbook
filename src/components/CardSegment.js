import React, { Component } from 'react'
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
    const { card_count, name, img_url } = this.props.card
    const segment = (
      <Segment>
        <a>{`${card_count} ${name}`}</a>
      </Segment>
    )
    if (this.props.editing) {
      return (
        <Segment>
          <p>Editing</p>
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
