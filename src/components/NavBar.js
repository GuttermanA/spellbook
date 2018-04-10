import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCards } from '../actions/cards'
import { fetchDecks } from '../actions/decks'
import { logoutUser } from '../actions/auth'
import {
  Container,
  Menu,
  Form,
  Dropdown,
} from 'semantic-ui-react'

class NavBar extends Component {
  state = {
    activeItem: 'home',
    search: "",
    submit: false,
    dropdown: 'cards',
   }

  handleItemClick = (event, { name }) => this.setState({ activeItem: name, submit: false })

  handleChange = (event, { value, name }) => {
    this.setState({
      [name]: value,
      submit: false
    })
  }

  handleSearch = (event, { name }) => {
    event.preventDefault()
    switch (this.state.dropdown) {
      case 'cards':
        this.props.fetchCards({name: this.state.search})
        break;
      case 'decks':
        this.props.fetchDecks({term: this.state.search})
        break;
      default:
        alert("Something went wrong in React Router")
    }
    this.setState({
      search: "",
      submit: !this.state.submit
    })
  }

  render() {
    const options = [
      {
        text:"Cards",
        value:"cards"
      },
      {
        text:"Decks",
        value:"decks"
      },
    ]
    const { activeItem, search, dropdown, submit } = this.state
    const { currentUser, loggedIn } = this.props
      return (
        <div>
          <Menu
            inverted
            pointing
          >
            <Container>
              <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
              <Menu.Item as={Link} to="/search" name='advancedSearch' active={activeItem === 'advancedSearch'} onClick={this.handleItemClick} />
              {loggedIn ? (<Menu.Item as={Link} to={{pathname:`/${currentUser.name}/decks`, state:{redirect: false}}} name="decks" active={activeItem === 'decks'} onClick={this.handleItemClick}/>) : null }
              {loggedIn ? (<Menu.Item as={Link} to={`/${currentUser.name}/collection`} name="collection" active={activeItem === 'collection'} onClick={this.handleItemClick}/>) : null }
              <Menu.Item position='right'>
                <Form onSubmit={this.handleSearch}>
                  <Form.Input icon='search' name='search' value={search} onChange={this.handleChange} placeholder={`Search ${dropdown}...`}/>
                </Form>
              </Menu.Item>
              <Dropdown name='dropdown' item onChange={this.handleChange} options={options} placeholder='Cards'/>
              {!loggedIn ? (
                <Menu.Item as={Link} to="/login" name="login" active={activeItem === 'login'} onClick={this.handleItemClick}/>
              ): (
                <Menu.Item as={Link} to="/" name="logout" onClick={this.props.logoutUser}/>
              )}
            </Container>
          </Menu>
          {submit ? <Redirect to={{pathname:`/results/${this.state.dropdown}`, state:{redirect: true}}}/>: null}
        </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, { fetchCards, fetchDecks, logoutUser })(NavBar)
