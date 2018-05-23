import React from 'react'
import DeckForm from '../DeckForm'
import CollectionForm from '../CollectionForm'
import { Sidebar, Button, Container, Dimmer, Loader, Divider, Segment, Sticky } from 'semantic-ui-react'


export default function withPusher(Component) {
  return (class extends React.Component {
    constructor(props) {
      super(props)
      this.sidebar = null
      this.pusher = null
      this.state = {
        visible: false,
        activeItem: '',
        sidebar: {
          width: null,
          height: null,
        },
        pusher:{
          width: null,
          height: null,
          initialWidth: null,
          initialHeight: null,
        }
      }
    }


    measure() {
      this.setState({
        sidebar: {
          width: this.sidebar.getBoundingClientRect().width,
          height: this.sidebar.getBoundingClientRect().height,
        },
        pusher: {
          initialWidth: this.pusher.getBoundingClientRect().width,
          initialHeight: this.pusher.getBoundingClientRect().height,
          width: this.pusher.getBoundingClientRect().width,
          height: this.pusher.getBoundingClientRect().height,
        }
      })
    }

    componentDidMount() {
      // console.log(document.querySelector('#sidebar').getBoundingClientRect());
      this.sidebar = document.querySelector('#sidebar')
      this.pusher = document.querySelector('#pusher')
      this.measure()
    }

    // componentDidUpdate() {
    //   this.measure()
    // }
    //
    // shouldComponentUpdate(nextProps, nextState) {
    //   return (
    //     this.state.width !== nextState.width ||
    //     this.state.height !== nextState.height
    //   )
    // }

    handleItemClick = (e, { name }) => {
      if (name === this.state.activeItem) {
        this.setState({
          activeItem: '',
          visible: false,
          pusher: {
            ...this.state.pusher,
            width: this.state.pusher.initialWidth,
          }
        }, ()=>console.log(this.state))
      } else {
        this.setState({
          activeItem: name,
          visible: true,
          pusher: {
            ...this.state.pusher,
            width: this.state.pusher.initialWidth - this.state.sidebar.width - 223,
          }
        })
      }
    }

    handleContextRef = contextRef => this.setState({ contextRef })

    render() {

      const { visible, activeItem, contextRef } = this.state
      const { loading, loggedIn } = this.props
      const style = {
        width: `${this.state.pusher.width}px`,
      }
      return (
      <Container as={Segment} fluid={true} ref={this.handleContextRef} basic>
        {loading ? <Dimmer active><Loader content='Fetching Cards'/></Dimmer> : null}
        { loggedIn && (<Button.Group >
          <Button  name='createDeck' active={ activeItem === 'createDeck'} onClick={this.handleItemClick}>Build Deck</Button>
          <Button  name='addToCollection' active={ activeItem === 'addToCollection'} onClick={this.handleItemClick}>Add to Collection</Button>
        </Button.Group>)}
        <Divider/>
        <Sidebar.Pushable className='sidebar-pusher' basic>
            <Sidebar animation='slide along' width='wide' visible={visible} id="sidebar">
              { activeItem === 'createDeck' ? <DeckForm /> : <CollectionForm />}
            </Sidebar>
          <Sidebar.Pusher as={Container} style={style} id="pusher" fluid basic>
            <Component {...this.props} pusherVisible={this.state.visible} pusherType={this.state.activeItem} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
      )
    }
  })
}
