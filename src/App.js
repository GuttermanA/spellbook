import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import CardListContainer from './containers/CardListContainer'
import Home from './components/HomePage'
import CardSearchForm from './components/CardSearchForm'
import { Route } from 'react-router-dom'

class App extends Component {

  state = {
    filters: {
      card: {}
    }
  }

  search = (searchTerms) => {
    if (typeof searchTerms === "string") {
      this.setState({
        filters: {
          card: {
            name: searchTerms
          }
        }
      })
    } else {
      let newState = {}
      for(let k in searchTerms) {
        newState[k] = searchTerms[k]
      }
      this.setState({
        filters: {
          card: newState
        }
      })
    }

  }

  render() {
    return (
      <div className="App">
        <NavBar search={this.search}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/search" render={() => <CardSearchForm search={this.search}/>}/>
        <Route exact path="/cards" render={() => <CardListContainer filters={this.state.filters.card}/>}/>
      </div>
    );
  }
}

export default App;
