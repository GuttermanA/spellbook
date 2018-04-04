import React from 'react'

const Card = (props) => {
  const {
      // id,
      name,
      // cmc,
      // mana_cost,
      // color_identity,
      // base_type,
      // rarity,
      // power,
      // toughness,
      // text,
      img_url,
  } = props.card
  return (
    <img src={img_url} className="img-fluid" alt={name}/>
  )
}
asd
export default Card
