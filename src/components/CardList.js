import React from 'react'
import Card from './Card'
import { Dimmer, Loader, Container } from 'semantic-ui-react'

const CardList = (props) => {
  const loader = (<Dimmer active><Loader /></Dimmer>)

  return (
    <Container>
      <div className="card-list">
        {filteredCards}
      </div>
    </Container>
  )
}

export default CardList
