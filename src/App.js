import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import CardContainer from './containers/CardContainer'
import DeckContainer from './containers/DeckContainer'
import Home from './components/HomePage'
import AdvancedSearchContainer from './containers/AdvancedSearchContainer'
import DeckShow from './components/DeckShow'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import UserDecksContainer from './containers/UserDecksContainer'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchFormats } from './actions/decks'
import { fetchUser } from './actions/auth'

class App extends Component {

  componentDidMount() {
    this.props.fetchFormats()
    let jwt = localStorage.getItem("token")
    if (jwt && !this.props.loggedIn) {
      this.props.fetchUser()
    }
  }

  render() {
    const { selectedDeck, currentUserDecks } = this.props
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/signup" component={SignupForm}/>
          <Route exact path="/results/cards" component={CardContainer}/>
          <Route exact path="/results/decks" component={DeckContainer}/>
          <Route exact path="/search" component={AdvancedSearchContainer}/>
          <Route exact path="/:username/decks" render={()=> <UserDecksContainer decks={currentUserDecks}/>} />
          <Route exact path="/decks/:id" render={() => <DeckShow deck={selectedDeck}/>}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.selectedDeck,
    loggedIn: !!state.auth.currentUser.id,
    currentUserDecks: state.decks.currentUserDecks,
  }
}

export default withRouter(connect(mapStateToProps, { fetchFormats, fetchUser })(App));
