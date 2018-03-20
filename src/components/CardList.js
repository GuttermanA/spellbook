import React from 'react'
import Card from './Card'
import { Dimmer, Loader, Container } from 'semantic-ui-react'

const CardList = (props) => {
  const loader = (<Dimmer active><Loader /></Dimmer>)
  const filteredCards = (props.fetch.fetched ? (props.fetch.cards.map(card => { return <Card card={card}/>})): null)
  return (
    <Container>
      <div className="card-list">
        {filteredCards}
      </div>
    </Container>
  )
}

export default CardList
