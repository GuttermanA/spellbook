import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Container,
  Menu,
  Input,
} from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {
    activeItem: 'home',
    name: "",
   }

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  handleChange = (event, { value }) => this.setState({ name: value })

  handleSearch = (event) => {
    this.props.search(this.state.name)
    this.setState({
      name: ""
    })
  }

  render() {

      return (
        <Menu inverted
          pointing
          size='large'
        >
          <Container>
            <Menu.Item as={NavLink} exact to="/" name='home' onClick={this.handleItemClick} />
            <Menu.Item as={NavLink} exact to="/search" name='card search' onClick={this.handleItemClick} />
            <Menu.Item position='right'>
              <Input icon='search' placeholder='Card name...' value={this.state.name} onChange={this.handleChange}/>
              <NavLink className="ui button" exact to="/cards" onClick={this.handleSearch}>Search</NavLink>
            </Menu.Item>
          </Container>
        </Menu>
    )
  }
}
