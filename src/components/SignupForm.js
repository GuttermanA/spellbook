import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../actions/auth'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react'

class SignupForm extends Component  {

  state = {
    error: false,
    fields: {
      username:'',
      password:'',
    }
  }

  handleChange = (event, { name, value }) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { fields: { username, password } } = this.state;
    this.props.loginUser(username, password, this.props.history);
    this.setState({
      username: '',
      password: '',
    })
  }

  render() {
    return (
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='top'
          className='login-form'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Divider hidden />
            <Header as='h2' textAlign='center'>
              {' '}Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name='username'
                  type='text'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/signup'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
    )
  }
}



export default connect(null, { loginUser })(SignupForm)
