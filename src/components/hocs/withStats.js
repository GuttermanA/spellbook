import React from 'react'
import { Grid, Container } from 'semantic-ui-react'

export default function withStats(Component) {
  return (class extends React.Component {

    render() {
      return (
        <Container>
          <Grid>
            <Grid.Column width={5}>
              <Component {...this.props}/>
            </Grid.Column>
            <Grid.Column width={11}>
              <p>Stats go here</p>
            </Grid.Column>
          </Grid>

        </Container>
      )
    }
  })
}
