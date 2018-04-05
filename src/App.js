import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import CardContainer from './containers/CardContainer'
import DeckContainer from './containers/DeckContainer'
import Home from './components/HomePage'
import AdvancedSearchContainer from './containers/AdvancedSearchContainer'
import { Route, Switch } from 'react-router-dom'

class App extends Component {

  render() {
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
