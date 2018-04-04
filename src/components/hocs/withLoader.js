import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

export default function withLoader(Component) {
  return (class extends Component {
    render() {
      return this.props.loading ? <Dimmer active><Loader /></Dimmer> : <Component {...this.props}/>
    }

  })
}
