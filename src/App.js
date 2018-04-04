import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import CardContainer from './containers/CardContainer'
import DeckContainer from './containers/DeckContainer'
import Home from './components/HomePage'
import AdvancedSearchContainer from './containers/AdvancedSearchContainer'
import { Route, Redirect, Switch } from 'react-router-dom'

class App extends Component {

  state = {
    cardSearchRedirect: false,
    deckSearchRedirect: false,
  }

  handleSearchRedirect = (search) => {
    if (search === 'cards') {
      this.setState({
        cardSearchRedirect: true
      })
    }
  }

  render() {
    const { cardSearchRedirect, deckSearchRedirect } = this.state
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/results/cards" render={() => <CardContainer />}/>
          <Route exact path="/results/decks" render={() => <DeckContainer/>}/>
          <Route exact path="/search" render={() => <AdvancedSearchContainer />}/>
        </Switch>
      </div>
    );
  }
}

export default App;
