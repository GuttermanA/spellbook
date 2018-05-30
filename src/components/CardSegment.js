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
    const { count, name, img_url } = this.props.card
    const segment = (
      <Segment >
        <a>{`${count} ${name}`}</a>
      </Segment>
    )

      return (
        <Popup
          trigger={segment}
          position='bottom center'
          on='hover'
          hoverable
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          <Image src={img_url} />
        </Popup>

      )

  }

}

export default CardSegment
