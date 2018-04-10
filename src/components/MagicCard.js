import React from 'react'
import {  Image } from 'semantic-ui-react'

const MagicCard = (props) => {
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

      <Image src={img_url} alt={name} height="310" width="223"/>

  )
}
export default MagicCard
