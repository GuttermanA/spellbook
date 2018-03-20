import React, { Component } from 'react';
import CardList from '../components/CardList'


class CardListContainer extends Component {

  state = {
    cards: [],
    fetched: false,
    // [
    //   {
    //       "id": 42,
    //       "name": "The Scorpion God",
    //       "cmc": 5,
    //       "mana_cost": "{3}{B}{R}",
    //       "color_identity": "BR",
    //       "base_type": "Creature",
    //       "rarity": "Special",
    //       "power": 6,
    //       "toughness": 5,
    //       "text": "Whenever a creature with a -1/-1 counter on it dies, draw a card.\n{1}{B}{R}: Put a -1/-1 counter on another target creature.\nWhen The Scorpion God dies, return it to its owner's hand at the beginning of the next end step.",
    //       "img_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=430689&type=card",
    //       "game_format": "standard",
    //       "created_at": "2018-03-05T05:09:46.646Z",
    //       "updated_at": "2018-03-05T05:09:46.646Z"
    //   },
    //   {
    //       "id": 64,
    //       "name": "Cinder Barrens",
    //       "cmc": 0,
    //       "mana_cost": null,
    //       "color_identity": "BR",
    //       "base_type": "Land",
    //       "rarity": "Uncommon",
    //       "power": null,
    //       "toughness": null,
    //       "text": "Cinder Barrens enters the battlefield tapped.\n{T}: Add {B} or {R} to your mana pool.",
    //       "img_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=433173&type=card",
    //       "game_format": "standard",
    //       "created_at": "2018-03-05T05:09:47.928Z",
    //       "updated_at": "2018-03-05T05:09:47.928Z"
    //   },
    //   {
    //       "id": 68,
    //       "name": "Dragonskull Summit",
    //       "cmc": 0,
    //       "mana_cost": null,
    //       "color_identity": "BR",
    //       "base_type": "Land",
    //       "rarity": "Rare",
    //       "power": null,
    //       "toughness": null,
    //       "text": "Dragonskull Summit enters the battlefield tapped unless you control a Swamp or a Mountain.\n{T}: Add {B} or {R} to your mana pool.",
    //       "img_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=420909&type=card",
    //       "game_format": "standard",
    //       "created_at": "2018-03-05T05:09:48.101Z",
    //       "updated_at": "2018-03-05T05:09:48.101Z"
    //   },
    //   {
    //       "id": 293,
    //       "name": "Dire Fleet Captain",
    //       "cmc": 2,
    //       "mana_cost": "{B}{R}",
    //       "color_identity": "BR",
    //       "base_type": "Creature",
    //       "rarity": "Uncommon",
    //       "power": 2,
    //       "toughness": 2,
    //       "text": "Whenever Dire Fleet Captain attacks, it gets +1/+1 until end of turn for each other attacking Pirate.",
    //       "img_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=435377&type=card",
    //       "game_format": "standard",
    //       "created_at": "2018-03-05T05:09:52.614Z",
    //       "updated_at": "2018-03-05T05:09:52.614Z"
    //   },
    //   {
    //       "id": 541,
    //       "name": "Unlicensed Disintegration",
    //       "cmc": 3,
    //       "mana_cost": "{1}{B}{R}",
    //       "color_identity": "BR",
    //       "base_type": "Instant",
    //       "rarity": "Uncommon",
    //       "power": null,
    //       "toughness": null,
    //       "text": "Destroy target creature. If you control an artifact, Unlicensed Disintegration deals 3 damage to that creature's controller.",
    //       "img_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=417760&type=card",
    //       "game_format": "standard",
    //       "created_at": "2018-03-05T05:09:58.966Z",
    //       "updated_at": "2018-03-05T05:09:58.966Z"
    //   }
    // ]
  }

  componentDidMount() {
    this.searchCards()
  }

  generateSearchParams() {
    let filters = this.props.filters
    let params = {}
    let card = {}
    for(let input in filters) {
      if (filters[input]) {
        params[`card[${input}]`] = filters[input]
      }
    }
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return query
  }

  searchCards() {
    console.log(this.generateSearchParams());
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    }
    console.log(`http://localhost:4000/cards?${this.generateSearchParams()}`);
    fetch(`http://localhost:4000/cards?${this.generateSearchParams()}`, options)
      .then(res => res.json())
      .then(json => {
        this.setState({cards: json, fetched: true}, ()=> console.log(this.state))
      })
  }

  render() {
    return (
      <div>
        {this.state.cards.length === 0 && this.state.fetched ? (<p>No cards found</p>) : (
          <CardList fetch={this.state}/>
        )}

      </div>
    )
  }
}

export default CardListContainer
