import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import CardListContainer from './containers/card_list_container'
import Home from './components/home_page'
import CardSearchForm from './components/card_search_form'
import { Route } from 'react-router-dom'

class App extends Component {

  state = {
    filters: {
      card: {}
    }
  }

  search = (searchTerms) => {
    let newState = {}
    for(let k in searchTerms) {
      newState[k] = searchTerms[k]
      // this.setState({
      //   [k]: searchTerms[k]
      // },()=> console.log(this.state))
    }
    this.setState({
      filters: {
        card: newState
      }
    },()=> console.log(this.state))

  }

  render() {
    return (
      <div className="App">
        <Navbar search={this.search}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/search" render={() => <CardSearchForm search={this.search}/>}/>
        <Route exact path="/cards" render={() => <CardListContainer filters={this.state.filters.card}/>}/>
      </div>
    );
  }
}

export default App;
