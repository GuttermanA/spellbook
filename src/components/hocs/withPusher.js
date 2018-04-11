import React from 'react'
import DeckForm from '../DeckForm'
import CollectionForm from '../CollectionForm'
import { Sidebar, Button, Container, Dimmer, Loader } from 'semantic-ui-react'


export default function withPusher(Component) {
  return (class extends React.Component {
    state = {
      visible: false,
      activeItem: '',
    }

    handleItemClick = (e, { name }) => {
      if (name === this.state.activeItem) {
        this.setState({
          activeItem: '',
          visible: false
        }, ()=> console.log(this.state))
      } else {
        this.setState({
          activeItem: name,
          visible: true
        })
      }
    }

    render() {

      const { visible, activeItem } = this.state
      return (
      <Container>
        {this.props.loading ? <Dimmer active><Loader content='Fetching Cards'/></Dimmer> : null}
        <Button.Group floated='left'>
          <Button name='createDeck' active={ activeItem === 'createDeck'} onClick={this.handleItemClick}>Build Deck</Button>
          <Button name='addToCollection' active={ activeItem === 'addToCollection'} onClick={this.handleItemClick}>Add to Collection</Button>
        </Button.Group>
        <Sidebar.Pushable as={Container} className='sidebar-pusher'>
          <Sidebar animation='slide along' width='wide' visible={visible} >
            { activeItem === 'createDeck' ? <DeckForm /> : <CollectionForm />}
          </Sidebar>
          <Sidebar.Pusher>
            <Component {...this.props} pusherVisible={this.state.visible} pusherType={this.state.activeItem}/>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
      )
    }
  })
}
