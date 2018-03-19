import React from 'react'
import Card from './card'

const CardList = (props) => {
  const filteredCards = props.cards.map(card => { return <Card card={card}/>})
  return (
    <div className="card-list">
      {filteredCards}

    </div>
  )
}

export default CardList
