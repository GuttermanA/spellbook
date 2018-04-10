import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Image, Icon } from 'semantic-ui-react'
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
        img_url,
    } = this.props.card
    const { mouseOver } = this.state
    const { pusherVisible } = this.props
    return (




    <div className="ui image" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
      <img src={img_url} height="310" width="223" alt={name}/>

        {mouseOver && pusherVisible ? <a className="ui grey ribbon label" onClick={this.handleAdd} name='mainboard'>Mainboard</a> : null}

        {mouseOver && pusherVisible ? <a className="ui black right ribbon label" onClick={this.handleAdd} name='sideboard'>Sideboard</a> : null}


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
