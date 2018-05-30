import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import CardContainer from './containers/CardContainer'
import DeckContainer from './containers/DeckContainer'
import Home from './components/HomePage'
import DeckShow from './components/DeckShow'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import DeckForm from './components/DeckForm'
import CollectionForm from './components/CollectionForm'
import NotFoundPage from './components/NotFoundPage'
import withStats from './components/hocs/withStats'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchMetaData } from './actions/init'
import { fetchUser } from './actions/auth'

const DeckFormWithStats = withStats(DeckForm)

class App extends Component {

  componentDidMount() {
    this.props.fetchMetaData()
    let jwt = localStorage.getItem("token")
    if (jwt && !this.props.loggedIn) {
      this.props.fetchUser()
    }
  }

  render() {
    const {
      selectedDeck,
      // loggedIn,
      // loading,
    } = this.props
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/signup" component={SignupForm}/>
          <Route exact path="/cards/search" component={CardContainer}/>
          <Route exact path="/decks/search" component={DeckContainer}/>
          <Route exact path="/:username/collection" component={CardContainer} />
          <Route exact path="/:username/collection/edit" component={CollectionForm} />
          <Route exact path="/:username/decks" component={DeckContainer} />
          <Route exact path="/:username/decks/new" component={DeckFormWithStats} />
          <Route exact path="/decks/:id" render={() => <DeckShow deck={selectedDeck}/>}/>
          <Route exact path="/:username/decks/:id" render={() => <DeckShow deck={selectedDeck}/>}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decks.selected,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default withRouter(connect(mapStateToProps, { fetchMetaData, fetchUser })(App));
