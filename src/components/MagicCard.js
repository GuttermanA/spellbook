import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCard } from '../actions/cards'

class MagicCard extends Component {

  state = {
    mouseOver: false,
  }

  handleAdd = (event) => {
    this.props.selectCard(this.props.card, event.target.name)
  }

  handleMouseOver = (event) => {
    this.setState({
      mouseOver: !this.state.mouseOver
    })
  }

  handleMouseLeave = (event) => {
    this.setState({
      mouseOver: !this.state.mouseOver
    })
  }

  render(){
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
        imgUrl,
    } = this.props.card
    const { mouseOver } = this.state
    const { pusherVisible, pusherType } = this.props
    return (
      <div className="ui image" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <img src={imgUrl} height="310" width="223" alt={name}/>

          {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui grey ribbon label" onClick={this.handleAdd} name='mainboard'>Mainboard</a> : null}

          {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui black right ribbon label" onClick={this.handleAdd} name='sideboard'>Sideboard</a> : null}

          {pusherVisible && pusherType === 'addToCollection' && mouseOver ? <a className="ui black ribbon label" onClick={this.handleAdd} name='collection'>Add</a> : null}

      </div>
    )
  }


}
export default connect(null, { selectCard })(MagicCard)
// <Image
//   src={img_url}
//   alt={name}
//   height="310"
//   width="223"
//   label={{ as:'a', content:'Mainboard', icon:'list', ribbon: true, onClick: this.handleAdd, name:'mainboard' }}
// />
