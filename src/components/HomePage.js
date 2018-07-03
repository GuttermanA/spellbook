import React from 'react';
import MagicCard from './MagicCard'
import DeckCard from './DeckCard'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withLoader from './hocs/withLoader'
import { Container, Header, Button, Icon, Segment, Grid, Divider, Menu } from 'semantic-ui-react'

const Home = (props) => {

  const handleClick = (event) => {
    props.history.push('/login')
  }

  return (
      <Segment id="home" color='grey' inverted textAlign='center' vertical style={{height: '100vh'}}>

        <Menu icon='labeled' vertical floated='right' inverted size='mini' compact>
          <Menu.Item
            name='github'
            as='a'
            href='https://github.com/GuttermanA'
            target='_blank'
          >
            <Icon name='github' />
          </Menu.Item>

          <Menu.Item
            name='linkedin'
            as='a'
            href='https://www.linkedin.com/in/alexander-gutterman-0186a94b/'
            target='_blank'
          >
            <Icon name='linkedin' />
          </Menu.Item>

          <Menu.Item
            name='mail'
            as='a'
            href='mailto:alexanderf.gutterman@gmail.com'
          >
            <Icon name='mail' />
          </Menu.Item>
        </Menu>

        <Container text>
          <Header
            className="main-header"
            as='h1'
            content='Spellbook'
            inverted
          />

        {props.loggedIn && (
            <Header
              className="sub-header"
              as='h2'
              inverted
            >
              Welcome <span className="username">{props.currentUser.name}</span>
            </Header>
          )}

          <Header
            className="sub-header"
            as='h2'
            content='Create and manage your Magic: The Gathering decks and collection.'
            inverted
          />


        { !props.loggedIn && (
          <Button primary size='huge' onClick={handleClick}>
            Get Started
            <Icon name='right arrow' />
          </Button>
        )}

        <Divider/>

        <Grid centered stackable>
          <Grid.Column width={6} verticalAlign="middle">
            <Header inverted as="h3" content="Card of the Day" />
            { (props.cardOfTheDay && Object.keys(props.cardOfTheDay).length && <MagicCard as={Segment} card={props.cardOfTheDay.attributes} loading={props.loading}/>) || <p>Server error</p> }
          </Grid.Column>
          <Grid.Column width={6} verticalAlign="middle">
            <Header inverted as="h3" content="Deck of the Day" />
            { (props.deckOfTheDay && Object.keys(props.deckOfTheDay).length  && <DeckCard as={Segment} deck={props.deckOfTheDay.attributes} loading={props.loading}/>) || <p>Server error</p> }
          </Grid.Column>
        </Grid>

        </Container>

      </Segment>

  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.init.loading,
    loggedIn: !!state.auth.currentUser.id,
    currentUser: state.auth.currentUser,
    cardOfTheDay: state.auth.cardOfTheDay,
    deckOfTheDay: state.auth.deckOfTheDay,
  }
}

export default connect(mapStateToProps)(withRouter(withLoader(Home)))
