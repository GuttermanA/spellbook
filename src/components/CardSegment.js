import React, { Component } from 'react'
import { Segment, Popup, Image } from 'semantic-ui-react'

const timeoutLength = 2500

class CardSegment extends Component {

  state = { isOpen: false }

  handleOpen = () => {
     this.setState({ isOpen: true })

     this.timeout = setTimeout(() => {
       this.setState({ isOpen: false })
     }, timeoutLength)
   }

   handleClose = () => {
     this.setState({ isOpen: false })
     clearTimeout(this.timeout)
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
