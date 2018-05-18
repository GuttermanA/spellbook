import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createUser } from '../actions/auth'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react'

class SignupForm extends Component  {

  state = {
    validation: {
      error: false,
      message: "",
    },
    fields: {
      username: '',
      password: '',
      passwordConfirmation: '',
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
    const { fields: { username, password, passwordConfirmation } } = this.state;
    if (password === passwordConfirmation) {
      this.props.createUser(username, password, this.props.history);
    } else {
      this.setState({
        validation: {
          error: true,
          message: "Passwords do not match"
        },
        fields: {
          ...this.state.fields,
          password: '',
          passwordConfirmation: '',
        }
      })
    }


  }

  render() {
    const { error, message } = this.state.validation
    return (
      <Grid
        textAlign='center'
        verticalAlign='top'
        className='login-form'
      >
        <Grid.Column className="auth-form-body">
          <Divider hidden />
          <Header as='h2' textAlign='center' >
            {' '}Signup for your account
          </Header>
          <Message warning attached hidden={ error === false}>
            <Message.Header>Something went wrong!</Message.Header>
            <p>{message}</p>
          </Message>
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
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password confirmation'
                name='passwordConfirmation'
                type='password'
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
              />

            <Button fluid size='large' >Signup</Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to='/signup'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}



export default connect(null, { createUser })(SignupForm)
