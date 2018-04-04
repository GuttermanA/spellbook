import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCards } from '../actions'
import {
  Container,
  Menu,
  Input,
} from 'semantic-ui-react'

class NavBar extends Component {
  state = {
    activeItem: 'home',
    name: "",
   }

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  handleChange = (event, { value, name }) => this.setState({ [name]: value })

  handleSearch = (event, { name }) => {
    event.preventDefault()
    this.handleItemClick(event, { name })
    this.props.fetchCards({name: this.state.name})
    this.setState({
      name: ""
    })
  }

  render() {
dadf
      return (
        <Menu inverted
          pointing
          size='large'
        >
          <Container>
            <Menu.Item as={Link} exact to="/" name='home' onClick={this.handleItemClick} />
            <Menu.Item as={Link} exact to="/cards/search" name='advancedSearch' onClick={this.handleItemClick} />
            <Menu.Item position='right'>
              <Input icon='search' name="name" placeholder='Card name...' value={this.state.name} onChange={this.handleChange}/>
            </Menu.Item>
            <Menu.Item as={Link} exact to="/cards/results" name='search' onClick={this.handleSearch} />
          </Container>
        </Menu>
    )
  }
}

export default connect(null, { fetchCards })(NavBar)
