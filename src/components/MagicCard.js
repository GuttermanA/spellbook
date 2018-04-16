import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCard } from '../actions/cards'
import { Card, List, Image } from 'semantic-ui-react'

class MagicCard extends Component {

  state = {
    mouseOver: false,
    collectionView: false,
  }

  handleAdd = (event) => {
    this.props.selectCard(this.props.card, event.target.name)
  }

  componentDidMount() {
    console.log(this.props.type);
    if (this.props.type === 'collection_card') {
      this.setState( { collectionView: true })
    }
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
        count,
        condition,
        setName,
        premium,
        wishlist,
    } = this.props.card

    const { mouseOver, collectionView } = this.state
    const { pusherVisible, pusherType } = this.props
    if (collectionView) {
      return (

      <Card onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ height:"310px", width:"223px"}}>
          {!mouseOver ? (
            <div className="ui image" >
              <img src={imgUrl} height="310" width="223" alt={name}/>
              {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui grey ribbon label" onClick={this.handleAdd} name='mainboard'>Mainboard</a> : null}

              {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui black right ribbon label" onClick={this.handleAdd} name='sideboard'>Sideboard</a> : null}

              {pusherVisible && pusherType === 'addToCollection' && mouseOver ? <a className="ui black ribbon label" onClick={this.handleAdd} name='collection'>Add</a> : null}
            </div>
          ) : (
              <List>
                <List.Item>
                  <List.Header>Count</List.Header>
                  {count}
                </List.Item>
                <List.Item>
                  <List.Header>Condition</List.Header>
                  {condition}
                </List.Item>
              </List>
          )}
        </Card>
        )

    } else {
      return (
        <Card onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ height:"310px", width:"223px"}}>
            <div className="ui image" >
              <img src={imgUrl} height="310" width="223" alt={name}/>
              {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui grey ribbon label" onClick={this.handleAdd} name='mainboard'>Mainboard</a> : null}

              {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui black right ribbon label" onClick={this.handleAdd} name='sideboard'>Sideboard</a> : null}

              {pusherVisible && pusherType === 'addToCollection' && mouseOver ? <a className="ui black ribbon label" onClick={this.handleAdd} name='collection'>Add</a> : null}
            </div>
        </Card>
      )
    }
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

// <Card>
//   <List>
//     <List.Item>
//       <List.Header>Count</List.Header>
//       {count}
//     </List.Item>
//     <List.Item>
//       <List.Header>Condition</List.Header>
//       {cond}
//     </List.Item>
//   </List>
// </Card>

//WORKING IMAGE
// <div className="ui image" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
//     <img src={imgUrl} height="310" width="223" alt={name}/>
//     {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui grey ribbon label" onClick={this.handleAdd} name='mainboard'>Mainboard</a> : null}
//
//     {pusherVisible && pusherType === 'createDeck' && mouseOver ? <a className="ui black right ribbon label" onClick={this.handleAdd} name='sideboard'>Sideboard</a> : null}
//
//     {pusherVisible && pusherType === 'addToCollection' && mouseOver ? <a className="ui black ribbon label" onClick={this.handleAdd} name='collection'>Add</a> : null}
// </div>
