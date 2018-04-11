import React, { Component } from 'react';
import { connect } from 'react-redux'
import withPusher from '../components/hocs/withPusher'

class CollectionContainer extends Component {

  render() {
    return (
      <p>Collection container</p>
    )
  }
}


export default withPusher(CollectionContainer)
