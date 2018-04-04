import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import CardContainer from './containers/CardContainer'
import Home from './components/HomePage'
import CardSearchForm from './components/CardSearchForm'
import { Route } from 'react-router-dom'

class App extends Component {

  state = {
    cardSearchRedirect: false,
    deckSearchRedirect: false,
  }

  handleSearch = () => {
    this.setState({
      redirect: true
    })
  }

  render() {
    console.log(CardContainer)
    const { cardSearchRedirect, deckSearchRedirect } = this.state
    return (
      <div className="App">
        <NavBar />

        <Route exact path="/" component={Home}/>
        <Route exact path="/cards/results" render={() => <CardContainer />}/>
        <Route exact path="/cards/search" render={() => <CardSearchForm />}/>

      </div>
    );
  }
}

export default App;
