import React from 'react';
import MagicCard from './MagicCard'
import DeckCard from './DeckCard'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withLoader from './hocs/withLoader'
import { Container, Header, Button, Icon, Segment, Grid, Divider } from 'semantic-ui-react'

const Home = (props) => {

  const handleClick = (event) => {
    props.history.push('/login')
  }

  return (
    <Segment color='grey' inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
      <Container text>
        <Header
          as='h1'
          content='Spellbook'
          inverted
          style={{
            fontSize:  '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop:  '1em',
            fontFamily: "Beleren Small Caps"
          }}
        />

      {props.loggedIn && (
          <Header
            as='h2'
            content={`Welcome ${props.currentUser.name}`}
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em',
              fontFamily: "Beleren Small Caps"
            }}
          />
        )}

        <Header
          as='h2'
          content='Create and manage your Magic: The Gathering decks and collection.'
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
            fontFamily: "Beleren Small Caps"
          }}
        />


      { !props.loggedIn && (
        <Button primary size='huge' onClick={handleClick}>
          Get Started
          <Icon name='right arrow' />
        </Button>
      )}
      <Divider/>
      <Grid centered>
        <Grid.Column width={6} verticalAlign="middle">
          <Header inverted as="h3" content="Card of the Day" style={{ fontFamily: "Beleren Small Caps"}}/>
          { Object.keys(props.cardOfTheDay).length && <MagicCard as={Segment} card={props.cardOfTheDay.attributes} /> }
        </Grid.Column>
        <Grid.Column width={6} verticalAlign="middle">
          <Header inverted as="h3" content="Deck of the Day"/>
          { Object.keys(props.deckOfTheDay).length  && <DeckCard as={Segment} deck={props.deckOfTheDay.attributes}/> }
        </Grid.Column>


      </Grid>

      </Container>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    loggedIn: !!state.auth.currentUser.id,
    currentUser: state.auth.currentUser,
    cardOfTheDay: state.auth.cardOfTheDay,
    deckOfTheDay: state.auth.deckOfTheDay,
  }
}

export default connect(mapStateToProps)(withRouter(withLoader(Home)))
