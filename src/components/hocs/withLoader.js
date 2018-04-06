import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

export default function withLoader(Component) {
  return (class extends React.Component {

    render() {
      console.log(this.props)
      return this.props.loading ? <Dimmer active><Loader /></Dimmer> : <Component {...this.props}/>
    }

  })
}
